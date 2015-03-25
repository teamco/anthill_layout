/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineFirePicPermission(BasePermission) {

    /**
     * Define Permissions
     * @class FirePicPermission
     * @constructor
     * @extends BasePermission
     */
    var FirePicPermission = function FirePicPermission() {

    };

    return FirePicPermission.extend('FirePicPermission', {

    }, BasePermission.prototype);
});
