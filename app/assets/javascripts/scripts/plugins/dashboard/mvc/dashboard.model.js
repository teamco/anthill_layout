/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'modules/Model'
], function defineDashboardModel(BaseModel) {

  /**
   * Define Dashboard model
   * @extends BaseModel
   * @class DashboardModel
   * @constructor
   */
  var DashboardModel = function DashboardModel() {
  };

  return DashboardModel.extend(
      'DashboardModel', {},
      BaseModel.prototype
  );
});