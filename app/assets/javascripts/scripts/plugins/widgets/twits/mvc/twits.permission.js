/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineTwitsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class TwitsPermission
     * @constructor
     * @extends BasePermission
     */
    var TwitsPermission = function TwitsPermission() {

    };

    return TwitsPermission.extend('TwitsPermission', {

    }, BasePermission.prototype);
});