class CreatePokemons < ActiveRecord::Migration[6.0]
  def change
    create_table :pokemons do |t|
      t.string :nickname
      t.string :species
      t.string :type
      t.integer :level
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
