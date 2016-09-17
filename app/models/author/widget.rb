require 'uuid'

class Author::Widget < ActiveRecord::Base

  belongs_to :author_widget_category,
             class_name: 'Author::WidgetCategory',
             foreign_key: :widget_category_id

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :user, through: :author_item

  has_many :author_site_storage_widgets,
           class_name: 'Author::SiteStorageWidget'

  has_many :author_site_storages,
           class_name: 'Author::SiteStorage',
           through: :author_site_storage_widgets

  scope :of_user, -> (user, visible=true, public=true) {
    joins(:author_item).
        where('visible=? AND (public=? OR user_id=?)', visible, public, user.id).
        order(name: :asc)
  }

  accepts_nested_attributes_for :author_site_storage_widgets, allow_destroy: true

  validates :resource, presence: true
  validates :width, presence: true, numericality: true
  validates :height, presence: true, numericality: true

  def self.fetch_data(user, category=nil, visible=true, public=true)
    filtered = of_user(user, visible, public)
    return filtered if category.nil?

    filtered.joins(:author_widget_category).
        where('author_widget_categories.id=?', category.id)
  end

  def self.fetch_site_widgets(key, visible=true, public=true)
    user = User.current
    return fetch_data(user) if key.nil?

    site_storage = Author::SiteStorage.fetch_data(user).where(key: key).first
    site_storage.author_widgets.
        of_user(user, visible, public) unless site_storage.nil?
  end

  def self.fetch_category_site_widgets(category, site, visible=true, public=true)
    user = User.current
    return category.author_widgets.of_user(user, visible, public) if site.nil?

    site.author_widgets.
        of_user(user, visible, public).
        joins(:author_widget_category).
        where(widget_category_id: category.id)
  end

  def self.build_data(params, category)
    uuid = UUID.new
    widget = new(params)
    widget.uuid = uuid.generate
    widget.widget_category_id = category.id
    widget.item_id = Author::Item.create_and_get.id
    widget
  end

end
