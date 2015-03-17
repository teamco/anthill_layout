/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSimpleWeatherPermission(BasePermission) {

    /**
     * Define Permissions
     * @class SimpleWeatherPermission
     * @constructor
     * @extends BasePermission
     */
    var SimpleWeatherPermission = function SimpleWeatherPermission() {

    };

    return SimpleWeatherPermission.extend('SimpleWeatherPermission', {

    }, BasePermission.prototype);
});
