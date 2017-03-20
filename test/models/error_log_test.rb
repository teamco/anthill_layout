# == Schema Information
#
# Table name: error_logs
#
#  id          :integer          not null, primary key
#  user_log_id :integer
#  name        :string
#  message     :text
#  exception   :text
#  backtrace   :text
#  is_fixed    :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class ErrorLogTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
