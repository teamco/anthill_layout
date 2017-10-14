module Author

  def self.table_name_prefix
    'author_'
  end

  def self.fetch_data(user)
    users_online = User.where('last_seen > ?', 5.minutes.ago)
    site_storages = SiteStorage.fetch_data(user)
    site_types = SiteType.fetch_data(user)
    widgets = Widget.fetch_data(user)
    user_logs = User.current.user_logs
    error_logs = User.current.error_logs
    {
        users: User.count,
        users_online: users_online.length,
        site_storages: site_storages.length,
        site_types: site_types.length,
        widget_categories: WidgetCategory.count,
        widgets: widgets.length,
        user_logs: user_logs.length,
        error_logs: error_logs.length
    }
  end
end
