/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineGiladPermission(BasePermission) {

    /**
     * Define Permissions
     * @class GiladPermission
     * @constructor
     * @extends BasePermission
     */
    var GiladPermission = function GiladPermission() {
    };

    return GiladPermission.extend(
        'GiladPermission', {}, 
        BasePermission.prototype
    );
});
