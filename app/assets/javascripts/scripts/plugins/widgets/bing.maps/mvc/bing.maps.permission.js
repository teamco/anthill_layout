/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineBingMapsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class BingMapsPermission
     * @constructor
     * @extends BasePermission
     */
    var BingMapsPermission = function BingMapsPermission() {
    };

    return BingMapsPermission.extend(
        'BingMapsPermission', {}, 
        BasePermission.prototype
    );
});
