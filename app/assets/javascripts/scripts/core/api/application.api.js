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
     * @class ApplicationAPI
     * @extends BaseAPI
     * @constructor
     */
    var ApplicationAPI = function ApplicationAPI() {
    };

    return ApplicationAPI.extend('ApplicationAPI', {

        /**
         * Create Workspace API
         * @memberOf ApplicationAPI
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