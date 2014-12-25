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

ActiveRecord::Schema.define(version: 20141224134814) do

  create_table "author_galleries", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.text     "thumbnail"
    t.string   "dimensions",  limit: 255
    t.string   "type",        limit: 255
    t.string   "resource",    limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "author_histories", force: :cascade do |t|
    t.integer  "site_id"
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "author_site_storages", force: :cascade do |t|
    t.string   "uud"
    t.string   "key"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "author_site_versions", force: :cascade do |t|
    t.integer  "version"
    t.integer  "site_storage_id"
    t.boolean  "activated",       default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "author_site_versions", ["site_storage_id"], name: "index_author_site_versions_on_site_storage_id"

  create_table "author_sites", force: :cascade do |t|
    t.string   "name"
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "author_widget_categories", force: :cascade do |t|
    t.string   "name_index"
    t.string   "name_value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "author_widgets", force: :cascade do |t|
    t.integer  "widget_category_id"
    t.string   "uuid"
    t.string   "name"
    t.string   "description"
    t.text     "thumbnail"
    t.integer  "width"
    t.integer  "height"
    t.string   "resource"
    t.boolean  "visible"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sites", force: :cascade do |t|
    t.string   "type"
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
