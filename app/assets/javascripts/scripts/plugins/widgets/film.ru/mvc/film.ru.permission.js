/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineFilmRuPermission(BasePermission) {

  /**
   * Define Permissions
   * @class FilmRuPermission
   * @constructor
   * @extends BasePermission
   */
  var FilmRuPermission = function FilmRuPermission() {
  };

  return FilmRuPermission.extend(
      'FilmRuPermission', {},
      BasePermission.prototype
  );
});
