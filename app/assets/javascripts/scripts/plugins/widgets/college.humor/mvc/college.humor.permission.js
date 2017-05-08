/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineCollegeHumorPermission(BasePermission) {

  /**
   * Define Permissions
   * @class CollegeHumorPermission
   * @constructor
   * @extends BasePermission
   */
  var CollegeHumorPermission = function CollegeHumorPermission() {

  };

  return CollegeHumorPermission.extend('CollegeHumorPermission', {},
      BasePermission.prototype);
});
