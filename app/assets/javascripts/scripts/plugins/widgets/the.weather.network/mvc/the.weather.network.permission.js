/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineTheWeatherNetworkPermission(BasePermission) {

    /**
     * Define Permissions
     * @class TheWeatherNetworkPermission
     * @constructor
     * @extends BasePermission
     */
    var TheWeatherNetworkPermission = function TheWeatherNetworkPermission() {
    };

    return TheWeatherNetworkPermission.extend(
        'TheWeatherNetworkPermission', {}, 
        BasePermission.prototype
    );
});
