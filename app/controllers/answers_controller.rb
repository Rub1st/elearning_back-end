class AnswersController < ApplicationController

  def create
    answer = Answer.new(permit_params)
    if answer.save
      render json: answer
    else
      render json: { errors: answer.errors }, status: :unprocessable_entity
    end
  end

  def update
    answer = Answer.find(params[:id])
    if answer.update(permit_params)
      render json: answer
    else
      render json: { errors: answer.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Answer.find(params[:id]).destroy
  end

  def index
    render json: Answer.all
  end

  def show
    render json: Answer.find(params[:id])
  end

  private

  def permit_params
    params.require(:answer).permit(
      :question_id,
      :value,
      :order
    )
  end
end
