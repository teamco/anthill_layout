/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base',
    'modules/api',
    'config/workspace'
], function defineApplicationAPI(Base, BaseAPI, Workspace) {
    var API = function API() {

    };

    return API.extend({
        createWorkspace: function createWorkspace(args, render) {
            return this._createItem(Workspace, args, render);
        }

    }, Base, BaseAPI.prototype);
});