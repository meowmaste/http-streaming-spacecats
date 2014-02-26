class CreateSpaceCats < ActiveRecord::Migration
  def change
    create_table :space_cats do |t|
      t.integer :x_pos
      t.integer :y_pos
      t.string :ip

      t.timestamps
    end

    add_index :space_cats, :ip
  end
end
