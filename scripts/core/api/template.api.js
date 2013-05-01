/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base',
    'modules/api'
], function defineTemplateAPI(Base, BaseAPI) {
    return function API() {
        var API = function API() {

        };

        return API.extend({
            createPage: function createPage(args, render, widget) {
                return this._createItem(require('config/page'), args, render, widget);
            }

        }, Base, BaseAPI.prototype);

    }();

});