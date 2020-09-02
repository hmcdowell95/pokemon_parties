class GamesController < ApplicationController
    def index
        games = Game.all 
        render json: games, only: [:id, :name, :trainer_name]
    end

    def create
        game = Game.create(name: params[:name], trainer_name: params[:trainer_name])
        render json: game
    end

    def destroy
        game = Game.find(params[:id])
        game.destroy
    end

end
