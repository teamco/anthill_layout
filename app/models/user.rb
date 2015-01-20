class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :timeoutable, :omniauthable,
         :omniauth_providers => [
             # :digitalocean,
             # :twitter,
             # :facebook,
             # :google,
             # :amazon,
             # :github
         ]

  has_many :author_site_storages,
           :class_name => 'Author::SiteStorage',
           dependent: :destroy

  belongs_to :role

  before_create :set_default_role

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end

  private

  def set_default_role
    self.role ||= Role.find_by_name('registered')
  end

end
