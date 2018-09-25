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

require 'test_helper'

class Author::ItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
