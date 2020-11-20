Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show]
    resources :stocks, only: [:index, :create]
    get '/stocks/:ticker', to: 'stocks#show'
    resource :session, only: [:create, :destroy, :show]
    resources :transactions, only: [:create, :index, :show]
    
  end

  root "static_pages#root"
end
