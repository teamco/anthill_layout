# == Schema Information
#
# Table name: user_logs
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  remote_addr     :string
#  session_id      :string
#  status          :integer
#  method          :string
#  controller      :string
#  action          :string
#  domain          :string
#  request_uri     :text
#  url             :text
#  request_format  :string
#  protocol        :string
#  host            :string
#  port            :string
#  user_params     :text
#  user_session    :text
#  query_string    :text
#  http_accept     :string
#  ssl             :boolean
#  xhr             :boolean
#  referer         :string
#  http_user_agent :string
#  server_software :string
#  content_type    :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class UserLogTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
