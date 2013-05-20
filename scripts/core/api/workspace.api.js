/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base',
    'modules/api',
    'config/page'
], function defineWorkspaceAPI(Base, BaseAPI, Page) {

    /**
     * Define Workspace API
     * @class API
     * @extends {Base}
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
         * @returns {*}
         */
        createPage: function createPage(args, render) {
            return this._createItem(Page, args, render);
        }

    }, Base, BaseAPI.prototype);
});