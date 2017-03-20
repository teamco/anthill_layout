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

require 'test_helper'

class Author::SiteStorageWidgetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
