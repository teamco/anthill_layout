class ErrorLog < ActiveRecord::Base

  belongs_to :user_log
  has_one :user, through: :user_log

  def self.handle_error(user, e)

    user_log = if user.nil?
                 UserLog.last
               else
                 user.user_logs.empty? ?
                     UserLog.last :
                     user.user_logs.order('updated_at DESC').limit(1).first
               end

    create!(
        {
            user_log_id: user_log.try(:id),
            name: (e.name rescue ''),
            message: e.message,
            exception: e.exception,
            backtrace: e.backtrace
        }
    )

  end

end
