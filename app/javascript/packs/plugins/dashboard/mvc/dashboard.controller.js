/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

defineP([
  'config/anthill',
  'plugins/plugin.controller'
], function defineDashboardController(AntHill, PluginBase) {

  /**
   * Define dashboard controller
   * @class DashboardController
   * @extends AntHill
   * @extends PluginController
   * @constructor
   */
  var DashboardController = function DashboardController() {
  };

  return DashboardController.extend('DashboardController', {

    /**
     * Define show content
     * @memberOf DashboardController
     */
    getModuleData: function getModuleData() {
      this.getView().get$item().openDashboard();
    }

  }, AntHill.prototype, PluginBase.prototype);
});