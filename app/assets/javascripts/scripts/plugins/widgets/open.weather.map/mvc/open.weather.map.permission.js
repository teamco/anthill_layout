/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineOpenWeatherMapPermission(BasePermission) {

  /**
   * Define Permissions
   * @class OpenWeatherMapPermission
   * @constructor
   * @extends BasePermission
   */
  var OpenWeatherMapPermission = function OpenWeatherMapPermission() {

  };

  return OpenWeatherMapPermission.extend('OpenWeatherMapPermission', {},
      BasePermission.prototype);
});