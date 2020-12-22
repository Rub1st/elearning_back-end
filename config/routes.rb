Rails.application.routes.draw do
  root 'static#index'

  devise_scope :user do
    resources :organizations, only: %i[create update index] do
      collection do
        get :search
      end
    end

    resources :registered_members, only: %i[create destroy index]  do
      collection do
        get :search
      end
    end

    resources :unregistered_members, only: %i[create destroy index] do
      collection do
        get :search
      end
    end

    resources :tags, only: %i[index] do
      collection do
        get :search
      end
    end

    resources :courses, only: %i[create update index] do
      collection do
        get :search
      end
    end

    resources :comments, only: %i[create destroy index] do
      collection do
        get :search
      end
    end

    resources :certificates, only: %i[create index] do
      collection do
        get :search
      end
    end

    resources :user_courses, only: %i[create update index] do
      collection do
        get :search
      end
    end

    resources :replies, only: %i[create destroy]
    resources :course_tags, only: %i[create]
    resources :impersonations, only: %i[create update]
    resources :pages, only: %i[create update destroy index]
    resources :questions, only: %i[create destroy index]
    resources :variants, only: %i[create destroy]
    resources :answers, only: %i[create update destroy index show]
    resources :user_answers, only: %i[create]
    resources :reports, only: %i[create index]
    resources :theories, only: %i[create destroy index]
    resources :course_members, only: %i[create]

    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  namespace :admin do
    resources :comments, only: %i[destroy index] do
      collection do
        get :search
      end
    end

    resources :courses, only: %i[update destroy index] do
      collection do
        get :search
      end
    end

    resources :impersonations, only: %i[index] do
      collection do
        get :search
      end
    end

    resources :organizations, only: %i[update destroy index] do
      collection do
        get :search
      end
    end

    resources :tags, only: %i[create update index] do
      collection do
        get :search
      end
    end

    resources :users, only: %i[update destroy index] do
      collection do
        get :search
      end
    end

    resources :replies, only: %i[destroy]
  end

  resources :users, only: %i[index update] do
    collection do
      get :search
    end

    post :impersonate, on: :member
    post :stop_impersonating, on: :collection
  end

  devise_for :users, controllers: { omniauth_callbacks: 'omniauth' }

  get '*path' => 'static#index', constraints: -> (req) { !(req.fullpath =~ /^\/rails\/.*/) }
end
