/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineJoinUsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class JoinUsPermission
     * @constructor
     * @extends BasePermission
     */
    var JoinUsPermission = function JoinUsPermission() {
    };

    return JoinUsPermission.extend(
        'JoinUsPermission', {}, 
        BasePermission.prototype
    );
});
