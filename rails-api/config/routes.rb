Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tests/index'

      get 'high_scores', to: 'high_scores#index'
      post 'high_scores', to: 'high_scores#post'

      post 'scored_words', to: 'scored_words#post' 
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
