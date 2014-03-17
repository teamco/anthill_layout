/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineLayoutPermission(BasePermission) {

    /**
     * Define Permissions
     * @extends BasePermission
     * @class LayoutPermission
     * @constructor
     */
    var LayoutPermission = function LayoutPermission() {

    };

    return LayoutPermission.extend('LayoutPermission', {

    }, BasePermission.prototype);
});