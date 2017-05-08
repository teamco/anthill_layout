class FixPublicWidgets < ActiveRecord::Migration[5.0]
  def change
    Author::Widget.all.each {|w| w.update(public: !w.is_external?)}
  end
end