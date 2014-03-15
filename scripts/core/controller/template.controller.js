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
     * @class TemplateController
     * @extends BaseController
     * @extends WorkspaceController
     * @constructor
     */
    var TemplateController = function TemplateController() {
    };

    return TemplateController.extend('TemplateController', {
    }, BaseController.prototype, BaseWorkspace.prototype);

});