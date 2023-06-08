Rails.application.routes.draw do
  root 'static_pages#top'
  get 'signup', to: 'users#new'
  post 'signup', to: 'users#create'
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'

  resources :photos
end
