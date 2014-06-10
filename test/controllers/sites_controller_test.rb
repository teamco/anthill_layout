require 'test_helper'

class SitesControllerTest < ActionController::TestCase
  setup do
    @site = sites(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sites)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create site" do
    assert_difference('Site.count') do
<<<<<<< HEAD
      post :create, site: { data: @site.data, name: @site.name }
=======
      post :create, site: { data: @site.data, type: @site.type }
>>>>>>> a6e980e9e496fcfb5ea19ab37c7e11b098b1e109
    end

    assert_redirected_to site_path(assigns(:site))
  end

  test "should show site" do
    get :show, id: @site
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @site
    assert_response :success
  end

  test "should update site" do
<<<<<<< HEAD
    patch :update, id: @site, site: { data: @site.data, name: @site.name }
=======
    patch :update, id: @site, site: { data: @site.data, type: @site.type }
>>>>>>> a6e980e9e496fcfb5ea19ab37c7e11b098b1e109
    assert_redirected_to site_path(assigns(:site))
  end

  test "should destroy site" do
    assert_difference('Site.count', -1) do
      delete :destroy, id: @site
    end

    assert_redirected_to sites_path
  end
end
