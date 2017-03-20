# == Schema Information
#
# Table name: author_widgets
#
#  id                 :integer          not null, primary key
#  widget_category_id :integer
#  uuid               :string
#  name               :string
#  description        :text
#  thumbnail          :text
#  width              :integer
#  height             :integer
#  resource           :string
#  is_external        :boolean          default(FALSE)
#  external_resource  :string
#  item_id            :integer
#

require 'test_helper'

class Author::WidgetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
