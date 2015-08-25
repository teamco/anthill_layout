class Author::SiteVersion < ActiveRecord::Base

  devise :database_authenticatable, :trackable, :timeoutable, :lockable

  belongs_to :user,
             foreign_key: :user_id

  belongs_to :author_site_storage,
             class_name: 'Author::SiteStorage',
             foreign_key: :site_storage_id

  def self.fetch_data(user)
    includes(:author_site_storage).
        where('visible=? AND (public=? OR user_id=?)', true, true, user.id).
        order(name: :asc)
  end
end