module Admin
  class TagsController < ApplicationController
    def create
      authorize!
      tag = Tag.new(permit_params)
      if tag.save
        render json: Tag.all
      else
        render json: { errors: tag.errors }, status: :unprocessable_entity
      end
    end

    def update
      authorize!
      tag = Tag.find(params[:id])
      if tag.update(permit_params)
        render json: Tag.all
      else
        render json: { errors: tag.errors }, status: :unprocessable_entity
      end
    end

    def index
      render json: Tag.all
    end

    def search
      render_search_data Tag
    end

    private

    def permit_params
      params.require(:tag).permit(
        :name
      )
    end
  end
end
