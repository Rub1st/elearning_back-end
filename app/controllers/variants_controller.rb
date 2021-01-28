class VariantsController < ApplicationController
  def create
    variant = Variant.new(variant_params)

    authorize! variant

    render_created_data(variant, Question.find(variant.question.id))
  end

  def destroy
    variant = Variant.find(params[:id])

    authorize! variant

    variant.destroy
  end

  private

  def variant_params
    params.require(:variant).permit(
      :order,
      :question_id,
      :value,
      :is_correct
    )
  end
end
