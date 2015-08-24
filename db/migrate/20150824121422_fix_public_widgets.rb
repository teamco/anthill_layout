class FixPublicWidgets < ActiveRecord::Migration
  def change
    Author::Widget.all.each {|w| w.update(public: !w.is_external?)}
  end
end