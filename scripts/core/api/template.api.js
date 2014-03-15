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
         * @extends BaseAPI
         * @constructor
         */
        var API = function API() {

        };

        return API.extend({

            /**
             * Create Page API
             * @member API
             * @param {*} args
             * @param {Boolean} [render]
             * @param {Boolean} [silent]
             * @param {*} widget
             * @returns {*}
             */
            createPage: function createPage(args, render, silent, widget) {

                /**
                 * Define Page
                 * @type {Function|exports}
                 */
                var Page = require('config/page');

                return this._createItem(
                    Page,
                    args,
                    render,
                    silent,
                    widget
                );
            }

        }, BaseAPI.prototype);

    }();

});