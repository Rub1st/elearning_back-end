class VariantsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    variant = Variant.new(permit_params)
    if variant.save
      variant = Variant.find(variant.id)
      render json: variant, status: 201
    else
      render json: { errors: variant.errors }, status: :unprocessable_entity
    end
  end

  def update
    variant = Variant.find(params[:id])

    if variant.update_attributes(permit_params)
      render json: variant, status: 201
    else
      render json: { errors: variant.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Variant.find(params[:id]).destroy
  end

  def index
    render json: Variant.all, status: :ok
  end

  def show
    render json: Variant.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(Variant.name.underscore.to_sym).permit(
      :order,
      :question_id,
      :value
    )
  end
end