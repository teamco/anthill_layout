/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineVideochartNetPermission(BasePermission) {

    /**
     * Define Permissions
     * @class VideochartNetPermission
     * @constructor
     * @extends BasePermission
     */
    var VideochartNetPermission = function VideochartNetPermission() {
    };

    return VideochartNetPermission.extend(
        'VideochartNetPermission', {},
        BasePermission.prototype
    );
});
