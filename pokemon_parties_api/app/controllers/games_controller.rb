class GamesController < ApplicationController
    def index
        games = Game.all 
        render json: games, only: [:name, :trainer_name]
    end
    
end
