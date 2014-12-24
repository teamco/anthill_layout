require 'test_helper'

class Author::SiteVersionsControllerTest < ActionController::TestCase
  setup do
    @author_site_version = author_site_versions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:author_site_versions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create author_site_version" do
    assert_difference('Author::SiteVersion.count') do
      post :create, author_site_version: {  }
    end

    assert_redirected_to author_site_version_path(assigns(:author_site_version))
  end

  test "should show author_site_version" do
    get :show, id: @author_site_version
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @author_site_version
    assert_response :success
  end

  test "should update author_site_version" do
    patch :update, id: @author_site_version, author_site_version: {  }
    assert_redirected_to author_site_version_path(assigns(:author_site_version))
  end

  test "should destroy author_site_version" do
    assert_difference('Author::SiteVersion.count', -1) do
      delete :destroy, id: @author_site_version
    end

    assert_redirected_to author_site_versions_path
  end
end
