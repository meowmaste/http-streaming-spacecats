require 'test_helper'

class SpaceCatsControllerTest < ActionController::TestCase
  setup do
    @space_cat = space_cats(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:space_cats)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create space_cat" do
    assert_difference('SpaceCat.count') do
      post :create, space_cat: {  }
    end

    assert_redirected_to space_cat_path(assigns(:space_cat))
  end

  test "should show space_cat" do
    get :show, id: @space_cat
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @space_cat
    assert_response :success
  end

  test "should update space_cat" do
    patch :update, id: @space_cat, space_cat: {  }
    assert_redirected_to space_cat_path(assigns(:space_cat))
  end

  test "should destroy space_cat" do
    assert_difference('SpaceCat.count', -1) do
      delete :destroy, id: @space_cat
    end

    assert_redirected_to space_cats_path
  end
end
