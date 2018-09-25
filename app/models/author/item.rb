# == Schema Information
#
# Table name: author_items
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  visible    :boolean          default(TRUE)
#  public     :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Author
  class Item < ApplicationRecord
    belongs_to :user, class_name: 'User', foreign_key: :user_id,
        inverse_of: :author_item

    has_one :author_site_type,
        class_name: 'Author::SiteType',
        inverse_of: :author_item

    has_one :author_site_storage,
        class_name: 'Author::SiteStorage',
        inverse_of: :author_item

    has_one :author_site_version,
        class_name: 'Author::SiteVersion',
        inverse_of: :author_item

    has_one :author_widget,
        class_name: 'Author::Widget',
        inverse_of: :author_item

    has_one :author_widget_category,
        class_name: 'Author::WidgetCategory',
        inverse_of: :author_item

    def self.create_and_get
      create(user_id: User.current.id)
    end
  end
end
