/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'modules/Model',
  'plugins/widgets/widget.content.model'
], function defineLiveLeakModel(BaseModel, WidgetContentModel) {

  /**
   * Define LiveLeak model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class LiveLeakModel
   * @constructor
   */
  var LiveLeakModel = function LiveLeakModel() {

    /**
     * Define preferences
     * @memberOf LiveLeakModel
     * @type {{
         *      liveleakUrl: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      liveleakUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf LiveLeakModel
     * @type {{}}
     */
    this.rules = {};
  };

  return LiveLeakModel.extend('LiveLeakModel', {

    /**
     * Set LiveLeak Url
     * @memberOf LiveLeakModel
     * @param {string} url
     */
    setLiveleakUrl: function setLiveleakUrl(url) {
      this.setPrefs('liveleakUrl', url);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
