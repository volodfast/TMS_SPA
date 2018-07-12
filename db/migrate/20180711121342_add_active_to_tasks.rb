class AddActiveToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :active, :boolean, default: false
  end
end
