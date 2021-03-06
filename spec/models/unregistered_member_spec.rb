# == Schema Information
#
# Table name: unregistered_members
#
#  id              :bigint           not null, primary key
#  member_role     :integer          default("common"), not null
#  organization_id :bigint           not null
#  code            :string           default(""), not null
#  email           :string           default(""), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe UnregisteredMember, type: :model do
  organization = Organization.create(name: 'Ruby&Rails',
                                     description: '-')
  it 'is valid with valid attributes' do
    expect(described_class.new(email: 'boris.ezhov@mail.com',
                               code: '34655234',
                               organization: organization)).to be_valid
  end

  it 'is not valid without a email' do
    unregistered_member = described_class.new(email: nil)
    expect(unregistered_member).to_not be_valid
  end

  it 'is not valid without a code' do
    unregistered_member = described_class.new(code: nil)
    expect(unregistered_member).to_not be_valid
  end
end
