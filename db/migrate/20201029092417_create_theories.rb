class CreateTheories < ActiveRecord::Migration[6.0]
  def change
    create_table :theories do |t|
      t.string :title, default: ''
      t.text :content, default: ''
      t.references :page, null: false, foreign_key: true
      t.index %i[page_id title], unique: true

      t.timestamps
    end
  end
end
