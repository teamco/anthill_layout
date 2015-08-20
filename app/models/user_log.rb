class UserLog < ActiveRecord::Base

  belongs_to :user
  has_one :error_log

  def self.except(cname, aname)
    log_except = [
        {controller: 'user_logs', action: 'index'},
        {controller: 'error_logs', action: 'index'}
    ]
    log_except.each { |x| return false if (x[:action] == aname || aname.nil?) if (x[:controller] == cname) }
    true
  end

end
