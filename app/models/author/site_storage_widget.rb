class Author::SiteStorageWidget < ActiveRecord::Base

  belongs_to :author_site_storage,
             class_name: 'Author::SiteStorage'

  belongs_to :author_widget,
             class_name: 'Author::Widget'

  belongs_to :user

  after_save :remove_nulls

  def remove_nulls
    nulls = Author::SiteStorageWidget.where(site_storage_id: nil)
    nulls.destroy_all
  end
end
