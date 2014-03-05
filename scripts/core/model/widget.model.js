/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineWidgetModel(BaseModel) {

    /**
     * Define Widget model
     * @mixin BaseModel
     * @class Model
     * @constructor
     */
    var Model = function Model() {
    };

    return Model.extend('Model', {

        /**
         * Define DOM
         */
        defineDOM: function defineDOM() {

            /**
             * Update DOM
             * @type {*}
             */
            this.scope.dom = this.scope.map.getDOM();
        },

        /**
         * Update DOM
         * @param {*} hash
         * @returns {*}
         */
        updateDOM: function updateDOM(hash) {

            var scope = this.scope;

            scope.logger.debug('Update DOM', hash);
            $.extend(true, scope.dom, hash);

            return scope;
        },

        /**
         * Get attributes
         * @returns {*}
         */
        getAttributes: function getAttributes() {
            return this.getConfig('attributes');
        },

        /**
         * Set attributes
         * @param key
         * @param value
         */
        setAttributes: function setAttributes(key, value) {
            this.scope.logger.debug('Set widget attributes', arguments);
            this.getAttributes()[key] = value;
        },

        /**
         * Update prefs
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
        }

    }, BaseModel.prototype);
});