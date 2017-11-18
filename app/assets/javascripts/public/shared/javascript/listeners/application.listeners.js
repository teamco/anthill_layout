/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:26 PM
 */

defineP(['config/application'],
    function defineApplicationListeners(Application) {

      /**
       * Define Application Global listeners
       * @memberOf Application
       * @type {{
     *      defineGlobalInstance: {name: string, callback: function}
     * }}
       */
      Application.prototype.globalListeners = {

        defineGlobalInstance: {
          name: 'defineP.global.instance',
          callback: function defineGlobalInstanceCallback() {
            if (this.controller.isDevelopmentMode()) {
              window[this.controller.getAppName()] = this;
            }
          }
        }
      };

      return Application;
    });