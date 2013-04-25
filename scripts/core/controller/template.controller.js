/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/controller',
    'modules/page'
], function defineTemplateController(BaseController, BasePage) {
    var Controller = function Controller() {
    };

    return Controller.extend({
    }, BaseController.prototype, BasePage.prototype);

});