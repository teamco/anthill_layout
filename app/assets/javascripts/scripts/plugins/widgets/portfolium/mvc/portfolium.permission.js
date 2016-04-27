/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePortfoliumPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PortfoliumPermission
     * @constructor
     * @extends BasePermission
     */
    var PortfoliumPermission = function PortfoliumPermission() {
    };

    return PortfoliumPermission.extend(
        'PortfoliumPermission', {}, 
        BasePermission.prototype
    );
});
