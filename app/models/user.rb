class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :trackable, :validatable

  ROLES = %w[admin moderator author consumer banned]

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

  has_and_belongs_to_many :roles

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end

  def role?(role)
    !roles.find_by_name(role.to_s.camelize).nil?
  end

end
