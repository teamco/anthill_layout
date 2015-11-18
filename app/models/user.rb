class User < ActiveRecord::Base

  include Gravtastic
  gravtastic

  TEMP_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :timeoutable, :omniauthable, :lastseenable,
         omniauth_providers: [
             # :digitalocean,
             :twitter,
             :facebook,
             # :google,
             # :amazon,
             :github,
             :linkedin,
             :aliexpress
         ]

  has_and_belongs_to_many :author_site_storages,
                          class_name: 'Author::SiteStorage',
                          dependent: :destroy,
                          through: :author_items

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id,
             dependent: :destroy

  has_many :author_widgets,
           class_name: 'Author::Widget',
           dependent: :destroy

  has_many :author_site_versions,
           class_name: 'Author::SiteVersion',
           dependent: :destroy,
           through: :author_item

  has_many :author_site_storage_widgets,
           class_name: 'Author::SiteStorageWidget',
           dependent: :destroy,
           through: :author_item

  has_many :author_site_types,
           class_name: 'Author::SiteType',
           dependent: :destroy,
           through: :author_item

  has_many :author_widget_categories,
           class_name: 'Author::WidgetCategory',
           dependent: :destroy,
           through: :author_item

  has_many :user_logs,
           class_name: 'UserLog',
           dependent: :destroy

  has_many :error_logs,
           class_name: 'ErrorLog',
           dependent: :destroy,
           through: :user_logs

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
    self.update(item_id: item.id)
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap { |user| create_from(auth, user) }
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
