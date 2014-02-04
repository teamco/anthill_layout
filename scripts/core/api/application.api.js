/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/api',
    'config/workspace'
], function defineApplicationAPI(BaseAPI, Workspace) {

    /**
     * Define Application API
     * @class API
     * @mixin {BaseAPI}
     * @constructor
     */
    var API = function API() {

    };

    return API.extend({

        /**
         * Create Workspace API
         * @param {*} args
         * @param {Boolean} [render]
         * @param {Boolean} [silent]
         * @returns {*}
         */
        createWorkspace: function createWorkspace(args, render, silent) {
            return this._createItem(Workspace, args, render, silent);
        }

    }, BaseAPI.prototype);
});