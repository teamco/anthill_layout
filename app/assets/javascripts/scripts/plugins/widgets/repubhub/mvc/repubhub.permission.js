/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineRepubhubPermission(BasePermission) {

    /**
     * Define Permissions
     * @class RepubhubPermission
     * @constructor
     * @extends BasePermission
     */
    var RepubhubPermission = function RepubhubPermission() {
    };

    return RepubhubPermission.extend(
        'RepubhubPermission', {}, 
        BasePermission.prototype
    );
});
