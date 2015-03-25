/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:26 PM
 */

define(['config/application'], function defineApplicationListeners(Application) {

    /**
     * Define Application Global listeners
     * @member Application
     * @type {{
     *      defineGlobalInstance: {name: string, callback: function}
     * }}
     */
    Application.prototype.globalListeners = {

        defineGlobalInstance: {
            name: 'define.global.instance',
            callback: function defineGlobalInstanceCallback() {
                if (this.controller.isDevelopmentMode()) {
                    window[this.model.getConfig('appName')] = this;
                }
            }
        }
    };

    return Application;
});