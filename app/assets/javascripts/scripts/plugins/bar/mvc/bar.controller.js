/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

/**
 * @constant PluginController
 * @type {module.PluginController|*}
 */
const PluginController = require('../../plugin.controller.js');

/**
 * Define Bar controller
 * @class BarController
 * @extends PluginController
 */
module.exports = class BarController extends PluginController {

  /**
   * @constructor
   * @param {Bar} scope
   */
  constructor(scope) {
    super('BarController', scope, false);
  }

  /**
   * Get modules data
   * @memberOf BarController
   */
  getData() {
    return this.model.getModules();
  }

  /**
   * Define modules
   * @memberOf BarController
   */
  defineModules() {
    this.model.storeModules();
  }

  /**
   * Load gallery content
   * @memberOf BarController
   */
  loadContent() {
    if (this.isDataNotExist()) {
      this.getView().renderContent(this.getData());
    }
  }
};