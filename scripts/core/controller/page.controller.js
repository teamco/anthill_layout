/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/controller'
], function definePageController(BaseController) {
    var Controller = function Controller() {

    };

    return Controller.extend({
        createLayout: function createLayout(Layout, opts) {
            this.layout = new Layout(opts);
        }
    }, BaseController.prototype);
});