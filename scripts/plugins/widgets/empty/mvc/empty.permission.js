/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineEmptyPermission(BasePermission) {

    /**
     * Define Permissions
     * @class EmptyPermission
     * @constructor
     * @extends BasePermission
     */
    var EmptyPermission = function EmptyPermission() {

    };

    return EmptyPermission.extend('EmptyPermission', {

    }, BasePermission.prototype);
});