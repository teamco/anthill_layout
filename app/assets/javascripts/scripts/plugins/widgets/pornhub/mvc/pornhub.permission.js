/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePornhubPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PornhubPermission
     * @constructor
     * @extends BasePermission
     */
    var PornhubPermission = function PornhubPermission() {

    };

    return PornhubPermission.extend('PornhubPermission', {

    }, BasePermission.prototype);
});
