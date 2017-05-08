/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller'
], function defineBarController(PluginBase) {

  /**
   * Define bar controller
   * @class BarController
   * @extends PluginController
   * @constructor
   */
  var BarController = function BarController() {
  };

  return BarController.extend('BarController', {

    /**
     * Get modules data
     * @memberOf BarController
     */
    getData: function getData() {
      return this.model.getModules();
    },

    /**
     * Define modules
     * @memberOf BarController
     */
    defineModules: function defineModules() {
      this.model.storeModules();
    },

    /**
     * Load gallery content
     * @memberOf BarController
     */
    loadContent: function loadContent() {

      if (this.isDataNotExist()) {
        this.getView().renderContent(
            this.getData()
        );
      }
    }

  }, PluginBase.prototype);
});