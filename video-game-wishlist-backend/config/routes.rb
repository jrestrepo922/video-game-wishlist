Rails.application.routes.draw do
  resources :genres, only: [:index] do 

  resources :video_games, only:[:new, :create, :edit, :update, :destroy, :index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  end 
end
