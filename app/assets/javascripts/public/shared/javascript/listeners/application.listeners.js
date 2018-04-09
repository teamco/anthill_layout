/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:26 PM
 */

/**
 * @constant Application
 * @type {Application}
 */
const Application = require('../../../../scripts/core/config/application.js');

/**
 * @method applicationGlobalListeners
 */
module.exports = () => {

  /**
   * Define Application Global listeners
   * @memberOf Application
   * @type {{
   *    defineGlobalInstance: {name: string, callback}
   * }}
   */
  Application.prototype.globalListeners = {

    defineGlobalInstance: {
      name: 'define.global.instance',
      callback: function defineGlobalInstanceCallback() {
        if (this.controller.isDevelopmentMode()) {
          window[this.controller.getAppName()] = this;
        }
      }
    }
  };
};