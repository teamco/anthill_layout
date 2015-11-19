module Author

  def self.table_name_prefix
    'author_'
  end

  def self.fetch_data(user)
    {
        users: User.count,
        users_online: User.where('last_seen > ?', 5.minutes.ago).length,
        site_storages: Author::SiteStorage.fetch_data(user).length,
        site_types: Author::SiteType.fetch_data(user).length,
        site_versions: user.author_site_versions.length,
        widget_categories: WidgetCategory.count,
        widgets: Widget.fetch_data(user).length,
        vulnerability_storage: user.vulnerability_storages.length,
        user_logs: User.current.user_logs.length,
        error_logs: User.current.error_logs.length
    }
  end
end