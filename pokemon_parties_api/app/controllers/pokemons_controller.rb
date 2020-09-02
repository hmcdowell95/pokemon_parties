class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons, only: [:id, :nickname, :species, :type, :level, :game_id]
    end

    def create
        Pokemon.create(nickname: params[:nickname], species: params[:species], typez: params[:typez], level: params[:level], game_id: params[:game_id])
    end

    def update
        pokemon = Pokemon.find(params[:id])
        pokemon.update(nickname: params[:nickname], level: params[:level])
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
    
end
