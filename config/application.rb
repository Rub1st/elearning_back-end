require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ElearningBackend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    # config.api_only = true

    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins '*',
    #     resource(
    #       '*',
    #       headers: :any,
    #       methods: [:get, :patch, :put, :delete, :post, :options]
    #     )
    #   end
    # end

    config.i18n.available_locales = %i[en ru]
    config.i18n.default_locale = :en
    config.i18n.fallbacks = true

    config.middleware.use I18n::JS::Middleware

    config.serve_static_assets = true
  end
end
