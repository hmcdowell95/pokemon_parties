class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons, only: [:id, :nickname, :species, :type, :level, :game_id]
    end

    
end
