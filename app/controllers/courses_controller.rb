class CoursesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    course = Course.new(permit_params)
    course.image.attach(io: File.open(permit_params[:image]), filename: 'file.jpg')
    if course.save
      render json: course
    else
      render json: { errors: course.errors }, status: :unprocessable_entity
    end
  end

  def update
    course = Course.find(params[:id])
    if course.update(permit_params)
      render json: course
    else
      render json: { errors: course.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Course.find(params[:id]).destroy
  end

  def index
    render json: Course.all
  end

  def show
    render json: Course.find(params[:id])
  end

  private

  def permit_params
    params.require(Course.name.underscore.to_sym).permit(
      :label,
      :mark,
      :why_content,
      :will_content,
      :uses_count,
      :success_rate,
      :access_type,
      :approve_status,
      :organization_id,
      :author_id,
      :image
    )
  end
end
