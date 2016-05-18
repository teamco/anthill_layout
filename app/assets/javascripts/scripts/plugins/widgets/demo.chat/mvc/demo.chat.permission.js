/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineDemoChatPermission(BasePermission) {

    /**
     * Define Permissions
     * @class DemoChatPermission
     * @constructor
     * @extends BasePermission
     */
    var DemoChatPermission = function DemoChatPermission() {
    };

    return DemoChatPermission.extend(
        'DemoChatPermission', {}, 
        BasePermission.prototype
    );
});
