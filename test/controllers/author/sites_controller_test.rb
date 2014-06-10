require 'test_helper'

class Author::SitesControllerTest < ActionController::TestCase
  setup do
    @author_site = author_sites(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:author_sites)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create author_site" do
    assert_difference('Author::Site.count') do
      post :create, author_site: { data: @author_site.data, name: @author_site.name }
    end

    assert_redirected_to author_site_path(assigns(:author_site))
  end

  test "should show author_site" do
    get :show, id: @author_site
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @author_site
    assert_response :success
  end

  test "should update author_site" do
    patch :update, id: @author_site, author_site: { data: @author_site.data, name: @author_site.name }
    assert_redirected_to author_site_path(assigns(:author_site))
  end

  test "should destroy author_site" do
    assert_difference('Author::Site.count', -1) do
      delete :destroy, id: @author_site
    end

    assert_redirected_to author_sites_path
  end
end
