/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base',
    'modules/api',
    'config/template',
    'config/widget'
], function definePageAPI(Base, BaseAPI, Template, Widget) {
    var API = function API() {

    };

    return API.extend({
        createWidget: function createWidget(args, render) {
            return this._createItem(Widget, args, render);
        },

        createTemplate: function createTemplate(widget) {
            return this._renderItem(Template, true, widget).api.createPage([], true);
        }

    }, Base, BaseAPI.prototype)
});