# == Schema Information
#
# Table name: author_site_storages
#
#  id           :integer          not null, primary key
#  uuid         :string
#  key          :string
#  site_type_id :integer
#  item_id      :integer
#  layout_type  :integer          default("js")
#

require 'test_helper'

class Author::SiteStorageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
