/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineLiveAmchartsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class LiveAmchartsPermission
     * @constructor
     * @extends BasePermission
     */
    var LiveAmchartsPermission = function LiveAmchartsPermission() {
    };

    return LiveAmchartsPermission.extend(
        'LiveAmchartsPermission', {}, 
        BasePermission.prototype
    );
});
