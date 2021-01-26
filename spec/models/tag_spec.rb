require 'rails_helper'

RSpec.describe Tag, type: :model do
  it 'is valid with valid attributes' do
    expect(described_class.new(name: 'IT')).to be_valid
  end

  it 'is not valid without a name' do
    tag = described_class.new(name: nil)
    expect(tag).to_not be_valid
  end
end