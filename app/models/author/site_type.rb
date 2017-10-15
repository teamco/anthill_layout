# == Schema Information
#
# Table name: author_site_types
#
#  id      :integer          not null, primary key
#  name    :string
#  item_id :integer
#

module Author
  class SiteType < ApplicationRecord

    include Base::AnthillModel
    has_many :author_site_storages, class_name: 'Author::SiteStorage', dependent: :destroy
    has_one :user, through: :author_item

    validates :name, presence: true

    self.select(:name).each do |type|
      define_method("is_#{type.name}?".to_sym) {|mode| mode == type.name}
    end

    def self.fetch_data(user, visible=true, public=true)
      of_user(user, visible, public).order(:name)
    end

    def get_sites(user, visible=true, public=true)
      author_site_storages.of_user(user, visible, public)
    end

    def self.get_mode(storage, name)
      mode = where(name: name).first
      mode.nil? ? storage.author_site_type.name : mode.name
    end
  end
end
