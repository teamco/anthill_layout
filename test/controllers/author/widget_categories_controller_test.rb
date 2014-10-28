require 'test_helper'

class Author::WidgetCategoriesControllerTest < ActionController::TestCase
  setup do
    @author_widget_category = author_widget_categories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:author_widget_categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create author_widget_category" do
    assert_difference('Author::WidgetCategory.count') do
      post :create, author_widget_category: { name: @author_widget_category.name }
    end

    assert_redirected_to author_widget_category_path(assigns(:author_widget_category))
  end

  test "should show author_widget_category" do
    get :show, id: @author_widget_category
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @author_widget_category
    assert_response :success
  end

  test "should update author_widget_category" do
    patch :update, id: @author_widget_category, author_widget_category: { name: @author_widget_category.name }
    assert_redirected_to author_widget_category_path(assigns(:author_widget_category))
  end

  test "should destroy author_widget_category" do
    assert_difference('Author::WidgetCategory.count', -1) do
      delete :destroy, id: @author_widget_category
    end

    assert_redirected_to author_widget_categories_path
  end
end
