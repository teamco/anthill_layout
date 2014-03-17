/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineTemplatePermission(BasePermission) {

    /**
     * Define Permissions
     * @extends BasePermission
     * @class TemplatePermission
     * @constructor
     */
    var TemplatePermission = function TemplatePermission() {

    };

    return TemplatePermission.extend('TemplatePermission', {

    }, BasePermission.prototype);
});