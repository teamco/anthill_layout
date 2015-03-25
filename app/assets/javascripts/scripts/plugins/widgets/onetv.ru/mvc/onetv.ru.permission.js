/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineOnetvRuPermission(BasePermission) {

    /**
     * Define Permissions
     * @class OnetvRuPermission
     * @constructor
     * @extends BasePermission
     */
    var OnetvRuPermission = function OnetvRuPermission() {

    };

    return OnetvRuPermission.extend('OnetvRuPermission', {

    }, BasePermission.prototype);
});
