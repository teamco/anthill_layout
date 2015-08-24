Rails.application.routes.draw do

  resources :error_logs do
    resources :user_logs
  end
  resources :user_logs do
    resources :error_logs
  end

  resources :vulnerability_storages

  devise_for :users,
             controllers: {
                 omniauth_callbacks: 'users/omniauth_callbacks'
             }

  namespace :author do
    resources :site_types
    resources :widgets do
      resources :widget_categories
    end
    resources :site_storages do
      resources :site_versions
      resources :widgets
      resources :vulnerability_storages
    end
    resources :site_versions do
      resources :site_storages
    end
    resources :widget_categories do
      resource :widgets
    end
    resources :vulnerability_storages
  end

  put '/fetch_external_widget', to: 'author/widgets#external_fetch'
  post '/external_widgets', to: 'author/widgets#external_widgets'

  get 'author/site_storages/publish/:key', to: 'author/site_storages#publish'
  put 'author/site_storages/publish/:key', to: 'author/site_storages#publish', as: 'publish_site'

  get '/sites/:key', to: 'author/site_storages#show', as: 'preview'
  get '/sites/:key/:mode', to: 'author/site_storages#show', as: 'mode'

  put '/sites/:key', to: 'author/site_storages#update'
  put '/sites/activate/:key', to: 'author/site_storages#activate'

  get '/author', to: 'author/author#index'

  get '/embedly', to: 'public/embedly#show'

  root 'author/author#index'

  get '*unmatched_route', to: 'application#raise_not_found'

end
