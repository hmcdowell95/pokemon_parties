class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons, only: [:id, :nickname, :species, :type, :level, :game_id]
    end

    def create
        Pokemon.create(nickname: params[:nickname], species: params[:species], type: params[:type], level: params[:level], game_id: params[:game_id])
    end

    def update
        pokemon = Pokemon.find(params[:id])
        pokemon.update(nickname: params[:nickname], level: params[:level])
    end

    
end
