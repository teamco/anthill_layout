require 'test_helper'

class Author::WidgetsControllerTest < ActionController::TestCase
  setup do
    @author_widget = author_widgets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:author_widgets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create author_widget" do
    assert_difference('Author::Widget.count') do
      post :create, author_widget: { description: @author_widget.description, height: @author_widget.height, name: @author_widget.name, resource: @author_widget.resource, thumbnail: @author_widget.thumbnail, type: @author_widget.type, width: @author_widget.width }
    end

    assert_redirected_to author_widget_path(assigns(:author_widget))
  end

  test "should show author_widget" do
    get :show, id: @author_widget
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @author_widget
    assert_response :success
  end

  test "should update author_widget" do
    patch :update, id: @author_widget, author_widget: { description: @author_widget.description, height: @author_widget.height, name: @author_widget.name, resource: @author_widget.resource, thumbnail: @author_widget.thumbnail, type: @author_widget.type, width: @author_widget.width }
    assert_redirected_to author_widget_path(assigns(:author_widget))
  end

  test "should destroy author_widget" do
    assert_difference('Author::Widget.count', -1) do
      delete :destroy, id: @author_widget
    end

    assert_redirected_to author_widgets_path
  end
end
