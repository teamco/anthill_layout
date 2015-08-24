module Author

  def self.table_name_prefix
    'author_'
  end

  def self.fetch_data(user)
    {
        users: User.count,
        site_storages: user.author_site_storages.length,
        site_types: user.author_site_types.length,
        site_versions: user.author_site_versions.length,
        widget_categories: WidgetCategory.count,
        widgets: Widget.fetch_data(user).length,
        vulnerability_storage: user.vulnerability_storages.length,
        user_logs: user.user_logs.length,
        error_logs: user.error_logs.length
    }
  end
end