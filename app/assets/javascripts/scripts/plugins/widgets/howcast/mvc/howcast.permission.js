/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineHowcastPermission(BasePermission) {

    /**
     * Define Permissions
     * @class HowcastPermission
     * @constructor
     * @extends BasePermission
     */
    var HowcastPermission = function HowcastPermission() {

    };

    return HowcastPermission.extend('HowcastPermission', {

    }, BasePermission.prototype);
});
