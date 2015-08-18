class User < ActiveRecord::Base

  TEMP_EMAIL_PREFIX = 'change@me'
  TEMP_EMAIL_REGEX = /\Achange@me/

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
             :linkedin
         ]

  has_many :author_site_storages,
           :class_name => 'Author::SiteStorage',
           dependent: :destroy

  has_many :author_widgets,
           :class_name => 'Author::Widget',
           dependent: :destroy

  has_many :author_site_versions,
           :class_name => 'Author::SiteVersion',
           dependent: :destroy

  has_many :author_site_storage_widgets,
           :class_name => 'Author::SiteStorageWidget',
           dependent: :destroy

  has_many :author_site_types,
           :class_name => 'Author::SiteType',
           dependent: :destroy

  has_many :author_widget_categories,
           :class_name => 'Author::WidgetCategory',
           dependent: :destroy

  belongs_to :role

  before_create :set_default_role

  validates_format_of :email, without: TEMP_EMAIL_REGEX, on: :update

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end

  def self.find_for_oauth(auth, signed_in_resource = nil)

    # Get the identity and user if they exist
    identity = Identity.find_for_oauth(auth)

    # If a signed_in_resource is provided it always overrides the existing user
    # to prevent the identity being locked with accidentally created accounts.
    # Note that this may leave zombie accounts (with no associated identity) which
    # can be cleaned up at a later date.
    user = signed_in_resource ? signed_in_resource : identity.user

    # Create the user if needed
    if user.nil?

      # Get the existing user by email if the provider gives us a verified email.
      # If no verified email was provided we assign a temporary email and ask the
      # user to verify it on the next step via UsersController.finish_signup
      email_is_verified = auth.info.email && (auth.info.verified || auth.info.verified_email)
      email = auth.info.email if email_is_verified
      user = User.where(email: email).first if email

      # Create the user if it's a new registration
      if user.nil?
        user = User.new(
            name: auth.extra.raw_info.name,
            #username: auth.info.nickname || auth.uid,
            email: email ? email : "#{TEMP_EMAIL_PREFIX}-#{auth.uid}-#{auth.provider}.com",
            password: Devise.friendly_token[0,20]
        )
        user.skip_confirmation!
        user.save!
      end
    end

    # Associate the identity with the user if needed
    if identity.user != user
      identity.user = user
      identity.save!
    end
    user
  end

  def email_verified?
    self.email && self.email !~ TEMP_EMAIL_REGEX
  end

  private

  def set_default_role
    self.role ||= Role.find_by_name('registered')
  end

end
