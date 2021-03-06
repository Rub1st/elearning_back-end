# == Schema Information
#
# Table name: pages
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  order      :integer          default(1), not null
#  title      :string           default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Page, type: :model do
  it 'is valid with valid attributes' do
    user = User.create(email: 'dionis.rubis@gmail.com',
                       password: '123456',
                       login: 'Akira',
                       full_name: 'Denis Rubis')

    course = Course.create(label: 'Ruby',
                           why_content: '-',
                           will_content: '-',
                           author: user)

    expect(described_class.new(course: course,
                               title: 'So Lets Start')).to be_valid
  end

  it 'is not valid without a title' do
    page = described_class.new(title: nil)
    expect(page).to_not be_valid
  end
end
