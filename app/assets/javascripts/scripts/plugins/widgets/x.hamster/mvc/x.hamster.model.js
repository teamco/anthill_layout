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
], function defineXHamsterModel(BaseModel, WidgetContentModel) {

  /**
   * Define XHamster model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class XHamsterModel
   * @constructor
   */
  var XHamsterModel = function XHamsterModel() {

    /**
     * Define preferences
     * @memberOf XHamsterModel
     * @type {{
         *      xhamsterUrl: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      xhamsterUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf XHamsterModel
     * @type {{}}
     */
    this.rules = {};
  };

  return XHamsterModel.extend('XHamsterModel', {

    /**
     * Set XHamster Url
     * @memberOf XHamsterModel
     * @param {string} url
     */
    setXhamsterUrl: function setXhamsterUrl(url) {
      this.setPrefs('xhamsterUrl', url);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
