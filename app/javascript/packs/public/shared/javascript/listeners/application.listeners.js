/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:26 PM
 */

import {Application} from '../../../../core/config/application';

export const applicationGlobalListeners = () => {

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
      callback() {
        if (this.controller.isDevelopmentMode()) {
          window[this.controller.getAppName()] = this;
        }
      }
    }
  };
};