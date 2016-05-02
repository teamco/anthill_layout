/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSkypePermission(BasePermission) {

    /**
     * Define Permissions
     * @class SkypePermission
     * @constructor
     * @extends BasePermission
     */
    var SkypePermission = function SkypePermission() {
    };

    return SkypePermission.extend(
        'SkypePermission', {}, 
        BasePermission.prototype
    );
});
