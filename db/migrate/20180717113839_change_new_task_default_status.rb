class ChangeNewTaskDefaultStatus < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:tasks, :active, true)
  end
end
