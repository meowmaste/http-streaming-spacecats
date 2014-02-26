class SpaceCatsController < ApplicationController
  before_action :set_space_cat, only: [:show, :edit, :update, :destroy]

  # GET /space_cats
  # GET /space_cats.json
  def index
    ip = request.remote_ip
    @space_cats = SpaceCat.where.not(ip: ip)
    @my_cat = SpaceCat.where(ip: ip).first_or_create
  end

  # GET /space_cats/1
  # GET /space_cats/1.json
  def show
  end

  # GET /space_cats/new
  def new
    @space_cat = SpaceCat.new
  end

  # GET /space_cats/1/edit
  def edit
  end

  # POST /space_cats
  # POST /space_cats.json
  def create
    @space_cat = SpaceCat.new(space_cat_params)

    respond_to do |format|
      if @space_cat.save
        format.html { redirect_to @space_cat, notice: 'Space cat was successfully created.' }
        format.json { render action: 'show', status: :created, location: @space_cat }
      else
        format.html { render action: 'new' }
        format.json { render json: @space_cat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /space_cats/1
  # PATCH/PUT /space_cats/1.json
  def update
    respond_to do |format|
      if @space_cat.update(space_cat_params)
        sync_update @space_cat
        format.html { redirect_to @space_cat, notice: 'Space cat was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @space_cat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /space_cats/1
  # DELETE /space_cats/1.json
  def destroy
    @space_cat.destroy
    respond_to do |format|
      format.html { redirect_to space_cats_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_space_cat
      @space_cat = SpaceCat.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def space_cat_params
      params.require(:space_cat).permit(:x_pos, :y_pos)
    end
end
