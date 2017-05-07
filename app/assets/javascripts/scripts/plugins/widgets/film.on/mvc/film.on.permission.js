/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineFilmOnPermission(BasePermission) {

  /**
   * Define Permissions
   * @class FilmOnPermission
   * @constructor
   * @extends BasePermission
   */
  var FilmOnPermission = function FilmOnPermission() {

  };

  return FilmOnPermission.extend('FilmOnPermission', {},
      BasePermission.prototype);
});
