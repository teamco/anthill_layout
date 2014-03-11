/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/controller',
    'controller/workspace.controller'
], function defineTemplateController(BaseController, BaseWorkspace) {

    /**
     * Define template controller
     * @class Controller
     * @mixin {BaseController, BaseWorkspace}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend('Controller', {
    }, BaseController.prototype, BaseWorkspace.prototype);

});