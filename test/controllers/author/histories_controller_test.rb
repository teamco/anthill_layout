require 'test_helper'

class Author::HistoriesControllerTest < ActionController::TestCase
  setup do
    @author_history = author_histories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:author_histories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create author_history" do
    assert_difference('Author::History.count') do
      post :create, author_history: { data: @author_history.data, site_id: @author_history.site_id }
    end

    assert_redirected_to author_history_path(assigns(:author_history))
  end

  test "should show author_history" do
    get :show, id: @author_history
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @author_history
    assert_response :success
  end

  test "should update author_history" do
    patch :update, id: @author_history, author_history: { data: @author_history.data, site_id: @author_history.site_id }
    assert_redirected_to author_history_path(assigns(:author_history))
  end

  test "should destroy author_history" do
    assert_difference('Author::History.count', -1) do
      delete :destroy, id: @author_history
    end

    assert_redirected_to author_histories_path
  end
end
