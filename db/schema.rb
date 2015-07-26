# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150426193350) do

  create_table "author_site_storage_widgets", force: :cascade do |t|
    t.integer  "site_storage_id", limit: 4
    t.integer  "widget_id",       limit: 4
    t.integer  "user_id",         limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "author_site_storage_widgets", ["site_storage_id"], name: "index_author_site_storage_widgets_on_site_storage_id", using: :btree
  add_index "author_site_storage_widgets", ["user_id"], name: "index_author_site_storage_widgets_on_user_id", using: :btree
  add_index "author_site_storage_widgets", ["widget_id"], name: "index_author_site_storage_widgets_on_widget_id", using: :btree

  create_table "author_site_storages", force: :cascade do |t|
    t.string   "uuid",         limit: 255
    t.string   "key",          limit: 255
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.integer  "site_type_id", limit: 4
    t.integer  "user_id",      limit: 4
    t.boolean  "publish",                  default: false
  end

  create_table "author_site_types", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "user_id",    limit: 4
  end

  create_table "author_site_versions", force: :cascade do |t|
    t.integer  "version",         limit: 4
    t.integer  "site_storage_id", limit: 4
    t.boolean  "activated",                        default: false
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
    t.text     "content",         limit: 16777215
    t.integer  "user_id",         limit: 4
  end

  add_index "author_site_versions", ["site_storage_id"], name: "index_author_site_versions_on_site_storage_id", using: :btree

  create_table "author_widget_categories", force: :cascade do |t|
    t.string   "name_index", limit: 255
    t.string   "name_value", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",    limit: 4
  end

  create_table "author_widgets", force: :cascade do |t|
    t.integer  "widget_category_id", limit: 4
    t.string   "uuid",               limit: 255
    t.string   "name",               limit: 255
    t.text     "description",        limit: 16777215
    t.text     "thumbnail",          limit: 16777215
    t.integer  "width",              limit: 4
    t.integer  "height",             limit: 4
    t.string   "resource",           limit: 255
    t.boolean  "is_external",                         default: false
    t.string   "external_resource",  limit: 255
    t.boolean  "visible"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",            limit: 4
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "provider",               limit: 255
    t.string   "uid",                    limit: 255
    t.integer  "role_id",                limit: 4
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
