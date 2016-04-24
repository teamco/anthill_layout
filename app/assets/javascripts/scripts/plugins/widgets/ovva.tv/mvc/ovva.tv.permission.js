/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineOvvaTvPermission(BasePermission) {

    /**
     * Define Permissions
     * @class OvvaTvPermission
     * @constructor
     * @extends BasePermission
     */
    var OvvaTvPermission = function OvvaTvPermission() {
    };

    return OvvaTvPermission.extend(
        'OvvaTvPermission', {}, 
        BasePermission.prototype
    );
});
