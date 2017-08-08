module Base::AnthillModel
  extend ActiveSupport::Concern
  included do
    belongs_to :author_item, class_name: 'Author::Item', foreign_key: :item_id
    accepts_nested_attributes_for :author_item, allow_destroy: true
    author_scoped = lambda do |user, visible = true, public = true, order_by = nil|
      sql = joins(:author_item).where('visible=? AND (public=? OR user_id=?)', visible, public, user.id)
      order.nil? ? sql : sql.order(order_by)
    end
    scope :of_user, author_scoped
  end
end