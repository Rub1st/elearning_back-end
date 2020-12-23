class CourseMembersController < ApplicationController
  def create
    course_member = CourseMember.new(permit_params)

    render_data(course_member.save, course_member)
  end

  private

  def permit_params
    params.require(:course_member).permit(
      :course_id,
      :user_id
    )
  end
end
