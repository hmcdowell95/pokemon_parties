Rails.application.routes.draw do
  resources :pokemons, only: [:index, :create, :update, :destroy]
  resources :games, only: [:index, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
