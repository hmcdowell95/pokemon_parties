class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons, only: [:id, :nickname, :species, :typez, :level, :game_id]
    end

    def create
        pokemon = Pokemon.create(nickname: params[:nickname], species: params[:species], typez: params[:typez], level: params[:level], game_id: params[:game_id])
        render json: pokemon, only: [:id, :nickname, :species, :typez, :level, :game_id]
    end

    def update
        pokemon = Pokemon.find(params[:id])
        pokemon.update(level: params[:level])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
    
end
