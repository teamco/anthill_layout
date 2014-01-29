/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/api'
], function defineTemplateAPI(BaseAPI) {

    return function API() {

        /**
         * Define Template API
         * @class API
         * @mixin {BaseAPI}
         * @constructor
         */
        var API = function API() {

        };

        return API.extend({

            /**
             * Create Page API
             * @param {*} args
             * @param {Boolean} [render]
             * @param {*} widget
             * @returns {*}
             */
            createPage: function createPage(args, render, widget) {
                return this._createItem(require('config/page'), args, render, widget);
            }

        }, BaseAPI.prototype);

    }();

});