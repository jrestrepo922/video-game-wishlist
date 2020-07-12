class CreateVideoGames < ActiveRecord::Migration[6.0]
  def change
    create_table :video_games do |t|
      t.string :name
      t.float :new
      t.float :pre_owned
      t.float :stars
      t.string :image
      t.string :company_name
      t.string :rated
      t.integer :genre_id

      t.timestamps
    end
  end
end
