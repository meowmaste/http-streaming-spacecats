function Emitter(point, velocity, spread) {
  this.position = point; // Vector
  this.velocity = velocity; // Vector
  this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
  this.drawColor = "#999"; // So we can tell them apart from Fields later
}

function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

$(function() {
var maxParticles = 20000,
  particleSize = 1,
  emissionRate = 20,
  objectSize = 3; // drawSize of emitter/field

var canvas = $('canvas').get(0);
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function rainbow() {
  var r, g, b;
    var h = Math.random();
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1, g = f, b = 0; break;
        case 1: r = q, g = 1, b = 0; break;
        case 2: r = 0, g = 1, b = f; break;
        case 3: r = 0, g = q, b = 1; break;
        case 4: r = f, g = 0, b = 1; break;
        case 5: r = 1, g = 0, b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    
  return (c);
};

function Particle(point, velocity, acceleration) {
  this.position = point || new Vector(0, 0);
  this.velocity = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
}

Particle.prototype.move = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};

function Field(point, mass) {
  this.position = point;
  this.setMass(mass);
}

Field.prototype.setMass = function(mass) {
  this.mass = mass || 100;
  this.drawColor = mass < 0 ? "#f00" : "#0f0";
}


Vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
}

Vector.prototype.getMagnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.getAngle = function () {
  return Math.atan2(this.y,this.x);
};

Vector.fromAngle = function (angle, magnitude) {
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};


Emitter.prototype.emitParticle = function() {
  // Use an angle randomized over the spread so we have more of a "spray"
  var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

  // The magnitude of the emitter's velocity
  var magnitude = this.velocity.getMagnitude();

  // The emitter's position
  var position = new Vector(this.position.x, this.position.y);

  // New velocity based off of the calculated angle and magnitude
  var velocity = Vector.fromAngle(angle, magnitude);

  // return our new Particle!
  return new Particle(position,velocity);
};

function addNewParticles() {
  // if we're at our max, stop emitting.
  if (particles.length > maxParticles) return;

  // for each emitter
  for (var i = 0; i < emitters.length; i++) {

    // emit [emissionRate] particles and store them in our particles array
    for (var j = 0; j < emissionRate; j++) {
      particles.push(emitters[i].emitParticle());
    }

  }
}

function plotParticles(boundsX, boundsY) {
  // a new array to hold particles within our bounds
  var currentParticles = [];

  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    var pos = particle.position;

    // If we're out of bounds, drop this particle and move on to the next
    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;

    // Move our particles
    particle.move();

    // Add this particle to the list of current particles
    currentParticles.push(particle);
  }

  // Update our global particles reference
  particles = currentParticles;
}

function drawParticles() {
  
  for (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    ctx.fillStyle = rainbow();
    ctx.fillRect(position.x, position.y, particleSize, particleSize);
  }
}

var particles = [];

var midX = canvas.width / 2;
var midY = canvas.height / 2; 

// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
emitters = [
  //new Emitter(new Vector(midX - 100, midY), Vector.fromAngle(0, 2)),
  //new Emitter(new Vector(midX - 400, midY), Vector.fromAngle(0, 2))
];

function loop() {
  clear();
  update();
  draw();
  queue();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  addNewParticles();
  plotParticles(canvas.width, canvas.height);
}

function draw() {
  drawParticles();
}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();
})
