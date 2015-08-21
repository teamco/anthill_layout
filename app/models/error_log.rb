class ErrorLog < ActiveRecord::Base

  belongs_to :user_log
  has_one :user, through: :user_log
end
