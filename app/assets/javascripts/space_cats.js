window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



$(function() {
  var $space_cat = $("#my_cat");
  var direction = {up:false, down:false, left:false, right:false};
  var rainbow =  false;
  var left, top;

  $(document).keyup( function(e) {
    switch(e.which) {
      case 40:
        // down
        direction.down = false;
        break;
      case 38:
        // up
        direction.up = false;
        break;
      case 37:
        // left
        direction.left = false;
        break;
      case 39:
        direction.right = false;
        break;
      case 32: {
        rainbow = false;
        emitters.length = 0;
        break;
      }
    }
  });

  function update() {
    $.ajax({
      url: space_cats.url,
      type: "PUT",
      data: {space_cat: {x_pos: left, y_pos:top}}
    });
  }

  var throttledUpdate = _.throttle(update, 200);

  function move() {
    var _left = parseInt($space_cat.css("left"), 10);
    var _top = parseInt($space_cat.css("top"), 10);
    var moved = false;

    if (direction.up) {
      _top -= 5;
      moved = true;
    } else if (direction.down) {
      _top += 5;
      moved = true;
    }

    if (direction.left) {
      _left -= 5;
      moved = true;
    } else if (direction.right) {
      _left += 5;
      moved = true;
    }

    if (moved) {
      top = _top;
      left = _left;
      $space_cat.css({left: left, top: top});
      throttledUpdate();
    }

    if (rainbow) {
        if (emitters.length == 0) {
          emitters.push(new Emitter(new Vector(left + 31, top + 54), Vector.fromAngle(Math.PI, 2)));
        }
    }
  }

  $(document).keydown(function(e) {

    switch(e.which) {
      case 40:
        // down
        direction.down = true;
        return false;
      case 38:
        // up
        direction.up = true;
        return false;
      case 37:
        direction.left = true;
        return false;
      case 39:
        direction.right = true;
        return false;
      case 32:
        rainbow = true;
        return false;
    }


  });

  var moveLoop = function() {
    requestAnimFrame(moveLoop);
    move();
  };

  moveLoop();

});

