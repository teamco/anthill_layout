/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineKalturaPermission(BasePermission) {

    /**
     * Define Permissions
     * @class KalturaPermission
     * @constructor
     * @extends BasePermission
     */
    var KalturaPermission = function KalturaPermission() {
    };

    return KalturaPermission.extend(
        'KalturaPermission', {}, 
        BasePermission.prototype
    );
});
