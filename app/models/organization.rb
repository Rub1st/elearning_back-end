# == Schema Information
#
# Table name: organizations
#
#  id                    :bigint      not null, primary key
#  name                  :string      not null
#  description           :string      not null
#  approve_status        :integer     not null
#
class Organization < ApplicationRecord
  has_many :courses, dependent: :destroy
  has_many :registered_members, dependent: :destroy
  has_many :unregistered_members, dependent: :destroy
  has_many :impersonations, dependent: :destroy

  has_one_attached :certificate_template

  enum approve_status: %i[pending rejected approved]

  validates :name, :description, presence: true

  searchkick word_middle: %i[name description]

  def search_data
    {
      name: name,
      description: description
    }
  end
end
