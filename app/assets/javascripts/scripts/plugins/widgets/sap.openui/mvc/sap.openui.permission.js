/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSapOpenuiPermission(BasePermission) {

    /**
     * Define Permissions
     * @class SapOpenuiPermission
     * @constructor
     * @extends BasePermission
     */
    var SapOpenuiPermission = function SapOpenuiPermission() {
    };

    return SapOpenuiPermission.extend(
        'SapOpenuiPermission', {}, 
        BasePermission.prototype
    );
});
