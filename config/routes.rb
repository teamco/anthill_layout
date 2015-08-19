Rails.application.routes.draw do

  resources :error_logs
  resources :user_logs
  resources :vulnerability_storages
  devise_for :users,
             controllers: {
                 omniauth_callbacks: 'callbacks'
             }

  namespace :author do
    resources :site_types
    resources :widgets
    resources :site_storages do
      resources :site_versions
      resources :widgets
      resources :vulnerability_storages
    end
    resources :site_versions do
      resources :site_storages
    end
    resources :widget_categories
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

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
