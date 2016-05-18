/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineFacilityPermission(BasePermission) {

    /**
     * Define Permissions
     * @class FacilityPermission
     * @constructor
     * @extends BasePermission
     */
    var FacilityPermission = function FacilityPermission() {
    };

    return FacilityPermission.extend(
        'FacilityPermission', {}, 
        BasePermission.prototype
    );
});
