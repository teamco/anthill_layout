require 'test_helper'

class ErrorLogsControllerTest < ActionController::TestCase
  setup do
    @error_log = error_logs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:error_logs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create error_log" do
    assert_difference('ErrorLog.count') do
      post :create, error_log: {  }
    end

    assert_redirected_to error_log_path(assigns(:error_log))
  end

  test "should show error_log" do
    get :show, id: @error_log
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @error_log
    assert_response :success
  end

  test "should update error_log" do
    patch :update, id: @error_log, error_log: {  }
    assert_redirected_to error_log_path(assigns(:error_log))
  end

  test "should destroy error_log" do
    assert_difference('ErrorLog.count', -1) do
      delete :destroy, id: @error_log
    end

    assert_redirected_to error_logs_path
  end
end
