Rails.application.routes.draw do
  
  scope '/api' do
    post 'user_token' => 'user_token#create'
    resources :users do
      delete 'tasks/delete_multiple' => 'tasks#delete_multiple'
      put 'tasks/change_active_multiple' => 'tasks#change_active_multiple'
      resources :tasks
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
