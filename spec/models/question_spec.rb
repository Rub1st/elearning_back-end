require 'rails_helper'

RSpec.describe Question, type: :model do
  it 'is valid with valid attributes' do
    user = User.create(email: 'dionis.rubis@gmail.com',
                       password: '123456',
                       login: 'Akira',
                       full_name: 'Denis Rubis')

    course = Course.create(label: 'Ruby',
                           why_content: '-',
                           will_content: '-',
                           author: user)

    page = Page.create(course: course,
                       title: 'So Lets Start')

    expect(described_class.new(page: page,
                               title: 'So Lets Start',
                               question_text: 'Choose right variants')).to be_valid
  end

  it 'is not valid without a title' do
    question = described_class.new(title: nil)
    expect(question).to_not be_valid
  end

  it 'is not valid without a question_text' do
    question = described_class.new(question_text: nil)
    expect(question).to_not be_valid
  end
end
