/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineCountDownPermission(BasePermission) {

    /**
     * Define Permissions
     * @class CountDownPermission
     * @constructor
     * @extends BasePermission
     */
    var CountDownPermission = function CountDownPermission() {
    };

    return CountDownPermission.extend(
        'CountDownPermission', {}, 
        BasePermission.prototype
    );
});
