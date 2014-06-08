/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineWidgetRulesPermission(BasePermission) {

    /**
     * Define Permissions
     * @class WidgetRulesPermission
     * @constructor
     * @extends BasePermission
     */
    var WidgetRulesPermission = function WidgetRulesPermission() {

    };

    return WidgetRulesPermission.extend('WidgetRulesPermission', {

    }, BasePermission.prototype);
});