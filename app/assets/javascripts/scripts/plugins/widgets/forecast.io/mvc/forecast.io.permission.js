/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineForecastIoPermission(BasePermission) {

    /**
     * Define Permissions
     * @class ForecastIoPermission
     * @constructor
     * @extends BasePermission
     */
    var ForecastIoPermission = function ForecastIoPermission() {
    };

    return ForecastIoPermission.extend(
        'ForecastIoPermission', {}, 
        BasePermission.prototype
    );
});
