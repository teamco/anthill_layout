/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineVideopressPermission(BasePermission) {

    /**
     * Define Permissions
     * @class VideopressPermission
     * @constructor
     * @extends BasePermission
     */
    var VideopressPermission = function VideopressPermission() {
    };

    return VideopressPermission.extend(
        'VideopressPermission', {}, 
        BasePermission.prototype
    );
});
