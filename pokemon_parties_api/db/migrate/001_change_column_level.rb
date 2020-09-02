class ChangeColumnLevel < ActiveRecord::Migration[6.0]
    def up
        change_column :pokemons, :level, :integer
    end
    def down
        change_column :pokemons, :level, :string
    end
end
