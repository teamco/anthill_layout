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
    var API = function API() {

    };

    return API.extend({
        createPage: function createPage(args, render) {
            return this._createItem(Page, args, render);
        }

    }, Base, BaseAPI.prototype);
});