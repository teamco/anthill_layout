class ErrorLog < ActiveRecord::Base

  belongs_to :user_log

  def self.list(opts)
    sort = "#{opts[:sort]} #{opts[:dir]}"
    sort = sort.strip.length > 0 ? sort : 'created_at DESC'
    logs = self.all.order(sort)

    log_map = []
    log_map = logs.map do |x|
      {
          id: x.id,
          type: x.error_type,
          status: x.error_status,
          title: x.error_title,
          body: x.error_body,
          is_fixed: x.is_fixed?,
          created_at: x.updated_at.strftime('%Y %b %d'),
          updated_at: x.updated_at.strftime('%Y %b %d %I:%M:%S %p'),
      }
    end unless logs.empty?

    log_map

  end
end
