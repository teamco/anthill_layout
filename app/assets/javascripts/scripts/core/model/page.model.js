/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
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
            'Layout'
        ];
    };

    return PageModel.extend('PageModel', {

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
            var split = id.split('-'),
                uuidArr = id.split('-'),
                uuid;

            for (var i = 0, l = uuidArr.length; i < l; i++) {

                split.pop();

                uuid = split.join('-');

                if (this.scope.base.isUUID(uuid)) {
                    return this.getItemByUUID(uuid);
                    break;
                }
            }
        },

        /**
         * Set layout mode
         * @member PageModel
         * @param {string} layout
         */
        setLayoutMode: function setLayoutMode(layout) {
            this._setItemInfoPreferences('layoutMode', layout);
        },

        /**
         * Set layout columns
         * @member PageModel
         * @param {number} columns
         */
        setLayoutColumns: function setLayoutColumns(columns) {
            this._setItemInfoPreferences('layoutColumns', columns);
        },

        /**
         * Set global widgets overlapping
         * @member PageModel
         * @param {boolean} overlapping
         */
        setOverlapping: function setOverlapping(overlapping) {
            this._setItemInfoPreferences('overlapping', overlapping);
            this.getConfig('widget').overlapping = overlapping;
        }

    }, BaseModel.prototype);
});