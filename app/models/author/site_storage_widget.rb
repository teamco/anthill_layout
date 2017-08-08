# == Schema Information
#
# Table name: author_site_storage_widgets
#
#  id              :integer          not null, primary key
#  site_storage_id :integer
#  widget_id       :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

module Author
  class SiteStorageWidget < ActiveRecord::Base

    belongs_to :author_site_storage, class_name: 'Author::SiteStorage', foreign_key: :site_storage_id
    belongs_to :author_widget, class_name: 'Author::Widget', foreign_key: :widget_id

    after_save :remove_nulls

    def remove_nulls
      nulls = Author::SiteStorageWidget.where(site_storage_id: nil)
      nulls.destroy_all
    end
  end
end
