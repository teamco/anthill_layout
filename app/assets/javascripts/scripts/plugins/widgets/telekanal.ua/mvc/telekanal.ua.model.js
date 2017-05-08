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
], function defineTelekanalUaModel(BaseModel, WidgetContentModel) {

  /**
   * Define TelekanalUa model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class TelekanalUaModel
   * @constructor
   */
  var TelekanalUaModel = function TelekanalUaModel() {

    /**
     * Define preferences
     * @memberOf TelekanalUaModel
     * @type {{
         *      telekanaluaUrl: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      telekanaluaUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf TelekanalUaModel
     * @type {{}}
     */
    this.rules = {};
  };

  return TelekanalUaModel.extend('TelekanalUaModel', {

    /**
     * Set TelekanalUa Url
     * @memberOf TelekanalUaModel
     * @param {string} url
     */
    setTelekanaluaUrl: function setTelekanaluaUrl(url) {
      this.setPrefs('telekanaluaUrl', url);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
