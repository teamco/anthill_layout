/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model',
    'config/widget'
], function definePageModel(BaseModel, Widget) {

    /**
     * Define Page model
     * @extends BaseModel
     * @class PageModel
     * @constructor
     */
    var PageModel = function PageModel() {

        /**
         * Define item
         * @member PageModel
         * @type {Widget}
         */
        this.item = Widget;

        /**
         * Define on destroy dependencies
         * @member PageModel
         * @type {Array}
         */
        this.onDestroy = [
            'Layout',
            'Template'
        ];
    };

    return PageModel.extend('PageModel', {

        /**
         * Update prefs
         * @member PageModel
         * @param data
         */
        updatePreferences: function updatePreferences(data) {

            /**
             * Get prefs
             * @type {*}
             */
            var preferences = this.getConfig('preferences');

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    preferences[index] = data[index];
                }
            }
        },

        /**
         * Get widget by content uuid
         * @member PageModel
         * @param {string} id
         * @returns {*}
         */
        getWidgetByContentUUID: function getWidgetByContentUUID(id) {

            /**
             * Split uuid
             * @type {Array}
             */
            var uuid = id.split('-');
            uuid.pop();

            return this.getItemByUUID(uuid.join('-'));
        }

    }, BaseModel.prototype);
});