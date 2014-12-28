require 'test_helper'

class Author::SiteTypesControllerTest < ActionController::TestCase
  setup do
    @author_site_type = author_site_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:author_site_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create author_site_type" do
    assert_difference('Author::SiteType.count') do
      post :create, author_site_type: { name: @author_site_type.name }
    end

    assert_redirected_to author_site_type_path(assigns(:author_site_type))
  end

  test "should show author_site_type" do
    get :show, id: @author_site_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @author_site_type
    assert_response :success
  end

  test "should update author_site_type" do
    patch :update, id: @author_site_type, author_site_type: { name: @author_site_type.name }
    assert_redirected_to author_site_type_path(assigns(:author_site_type))
  end

  test "should destroy author_site_type" do
    assert_difference('Author::SiteType.count', -1) do
      delete :destroy, id: @author_site_type
    end

    assert_redirected_to author_site_types_path
  end
end
