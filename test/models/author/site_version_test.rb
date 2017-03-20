# == Schema Information
#
# Table name: author_site_versions
#
#  id              :integer          not null, primary key
#  version         :integer
#  site_storage_id :integer
#  activated       :boolean          default(FALSE)
#  content         :text
#  item_id         :integer
#  screenshot      :text
#  published       :boolean          default(FALSE)
#  deployed        :boolean          default(FALSE)
#

require 'test_helper'

class Author::SiteVersionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
