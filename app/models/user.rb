# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  created_at             :datetime
#  updated_at             :datetime
#  provider               :string
#  uid                    :string
#  role_id                :integer
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  failed_attempts        :integer          default(0), not null
#  unlock_token           :string
#  locked_at              :datetime
#  oauth_token            :string
#  oauth_expires_at       :datetime
#  name                   :string
#  image                  :string
#  last_seen              :datetime
#  item_id                :integer
#  original_email         :string
#

class User < ApplicationRecord

  include Gravtastic
  gravtastic

  TEMP_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

  devise :database_authenticatable, :registerable, :recoverable, :rememberable,
      :trackable, :timeoutable, :omniauthable, :lastseenable,
      omniauth_providers: [
          # :digitalocean,
          :twitter,
          :facebook,
          # :google,
          # :amazon,
          :github,
          :bitbucket,
          :linkedin,
          :aliexpress
      ]

  attr_accessor :oauth_expires_at

  has_and_belongs_to_many :author_site_storages,
      class_name: 'Author::SiteStorage'

  belongs_to :author_item,
      class_name: 'Author::Item',
      dependent: :destroy

  has_many :author_widgets,
      class_name: 'Author::Widget',
      dependent: :destroy

  has_many :author_site_storages,
      class_name: 'Author::SiteStorage',
      dependent: :destroy

  has_many :author_site_versions,
      dependent: :destroy,
      class_name: 'Author::SiteVersion'

  has_many :author_site_storage_widgets,
      class_name: 'Author::SiteStorageWidget',
      dependent: :destroy

  has_many :author_site_types,
      class_name: 'Author::SiteType',
      dependent: :destroy

  has_many :author_widget_categories,
      class_name: 'Author::WidgetCategory',
      dependent: :destroy

  has_many :user_logs,
      class_name: 'UserLog',
      dependent: :destroy

  has_many :error_logs,
      class_name: 'ErrorLog',
      dependent: :destroy

  has_many :vulnerability_storages,
      class_name: 'VulnerabilityStorage',
      dependent: :destroy,
      through: :author_site_storages

  belongs_to :role

  before_create :set_default_role

  validates_format_of :email,
      with: TEMP_EMAIL_REGEX,
      on: :update,
      uniqueness: {
          case_sensitive: false
      }

  before_create :update_profile
  before_update :update_profile
  after_create :update_item

  def update_profile
    self.original_email = self.email.clone
    self.email = "#{self.uid}@#{self.provider}.com" unless self.provider.nil?
  end

  def update_item
    item = Author::Item.create(public: false, visible: true, user_id: self.id)
    self.update(author_item_id: item.id)
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap {|user| create_from(auth, user)}
  end

  def email_verified?
    self.email && self.email !~ TEMP_EMAIL_REGEX
  end

  def self.fetch_data(user)
    all
  end

  def online
    where('last_seen > ?', 5.minutes.ago)
  end

  def self.current
    Thread.current[:user]
  end

  def self.current=(user)
    Thread.current[:user] = user
  end

  private

  ##
  # @param user [Hash]
  def self.create_from(auth, user)
    user.provider = auth.provider
    user.uid = auth.uid
    user.oauth_token = auth.credentials.token
    user.oauth_expires_at = Time.at(auth.credentials.expires_at) unless auth.credentials.expires_at.nil?

    user.name = auth.info.name || user.uid
    user.email = auth.info.email || "#{user.uid}@#{user.provider}.com"
    user.password = Devise.friendly_token[0, 20]

    # assuming the user model has an image
    user.image = auth.info.image
    user.save
  end

  def set_default_role
    self.role ||= Role.find_by_name('registered')
  end

end
