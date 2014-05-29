/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/api',
    'config/page'
], function defineWorkspaceAPI(BaseAPI, Page) {

    /**
     * Define Workspace API
     * @class WorkspaceAPI
     * @extends BaseAPI
     * @constructor
     */
    var WorkspaceAPI = function WorkspaceAPI() {

    };

    return WorkspaceAPI.extend('WorkspaceAPI', {

        /**
         * Create Page API
         * @member WorkspaceAPI
         * @param {*} args
         * @param {Boolean} [render]
         * @param {Boolean} [silent]
         * @returns {*}
         */
        createPage: function createPage(args, render, silent) {

            /**
             * Define page
             * @type {Page}
             */
            var page = this._createItem(Page, args, render, silent);

            return page;
        }

    }, BaseAPI.prototype);
});