require 'test_helper'

class Author::SiteStoragesControllerTest < ActionController::TestCase
  setup do
    @author_site_storage = author_site_storages(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:author_site_storages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create author_site_storage" do
    assert_difference('Author::SiteStorage.count') do
      post :create, author_site_storage: {  }
    end

    assert_redirected_to author_site_storage_path(assigns(:author_site_storage))
  end

  test "should show author_site_storage" do
    get :show, id: @author_site_storage
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @author_site_storage
    assert_response :success
  end

  test "should update author_site_storage" do
    patch :update, id: @author_site_storage, author_site_storage: {  }
    assert_redirected_to author_site_storage_path(assigns(:author_site_storage))
  end

  test "should destroy author_site_storage" do
    assert_difference('Author::SiteStorage.count', -1) do
      delete :destroy, id: @author_site_storage
    end

    assert_redirected_to author_site_storages_path
  end
end
