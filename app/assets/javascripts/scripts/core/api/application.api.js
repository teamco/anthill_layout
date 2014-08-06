/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/API',
    'config/workspace'
], function defineApplicationAPI(BaseAPI, Workspace) {

    /**
     * Define Application API
     * @class AppAPI
     * @extends BaseAPI
     * @constructor
     */
    var AppAPI = function AppAPI() {

    };

    return AppAPI.extend('AppAPI', {

        /**
         * Create Workspace API
         * @memberOf AppAPI
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