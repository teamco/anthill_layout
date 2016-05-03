Rails.application.routes.draw do

  resources :error_logs, only: [:show, :index] do
    resources :user_logs, only: [:show, :index]
  end
  post '/error_logs/handle_js', to: 'error_logs#handle_js'

  resources :user_logs, only: [:show, :index] do
    resources :error_logs, only: [:show, :index]
  end

  resources :vulnerability_storages, only: [:show, :index]

  devise_for :users,
             controllers: {
                 omniauth_callbacks: 'users/omniauth_callbacks',
                 registrations: 'users/registrations'
             }

  get '/auth/failure', to: redirect('/')

  namespace :author do

    resources :site_types

    get 'widgets/all', to: 'widgets#all', as: 'widgets_all'
    resources :widgets do
      resources :widget_categories
    end

    resources :site_storages do
      resources :site_versions do
        put 'activate', to: 'site_storages#activate_site_version'
        put 'deactivate', to: 'site_storages#deactivate_site_version'
      end
      resources :widgets
      get 'users', to: 'users#site_users'
    end

    resources :site_versions do
      resources :site_storages
    end

    resources :widget_categories do
      get 'widgets', to: 'widgets#index'
      resource :widgets
    end

    resources :users do
      resources :site_storages
      resources :widgets
    end
  end

  namespace :saas do
    get 'ali_express/api_tool/:api', to: '/saas/ali_express#api_tool'
  end

  resources :site_storages, path: 'author/site_storages' do
    resources :vulnerability_storages
  end

  resources :vulnerability_storages, only: [:index]

  put '/fetch_external_widget', to: 'author/widgets#external_fetch'
  post '/external_widgets', to: 'author/widgets#external_widgets'

  get '/readability_content/:url', to: 'author/widgets#readability_content'

  get 'author/site_versions/publish/:id', to: 'author/site_versions#publish'
  put 'author/site_versions/publish/:id', to: 'author/site_versions#publish', as: 'publish_site'

  get '/sites/:key', to: 'author/site_storages#show', as: 'preview'
  get '/sites/:key/:mode', to: 'author/site_storages#show', as: 'mode'

  put '/sites/:key', to: 'author/site_storages#update'
  put '/sites/activate/:key/:version', to: 'author/site_versions#activate'

  get '/author', to: 'author/author#index'

  get '/embedly', to: 'public/embedly#show'

  get '/widget/fetch_embedded_content', to: 'author/widgets#fetch_embedded_content'

  root 'author/author#index'

  get '*unmatched_route', to: 'application#raise_not_found'

end
