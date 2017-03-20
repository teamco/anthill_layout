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

class ErrorLog < ActiveRecord::Base

  belongs_to :user_log
  has_one :user, through: :user_log

  def self.handle_error(user, e, user_log)

    user_log = if user.nil?
                 UserLog.last
               else
                 user.user_logs.empty? ?
                     UserLog.last :
                     user.user_logs.order('updated_at DESC').limit(1).first
               end if user_log.nil?

    create!(
        {
            user_log_id: user_log.try(:id),
            name: (e.name rescue ''),
            message: e.cause,
            exception: e.exception,
            backtrace: e.backtrace
        }
    )

  end

  def self.handle_js_error(user, log)

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
            name: log['type'],
            message: log['message'],
            exception: log['exception'],
            backtrace: (log['backtrace'] || '').
                gsub(/<pre><code>/, '').
                gsub(/<\/code><\/pre>/, '').
                gsub(/\n/, ',').split(',').
                to_json
        }
    )
  end

  def self.fetch_data(user)
    user.error_logs.order('id DESC').includes(:user_log)
  end

end
