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
], function defineHowcastModel(BaseModel, WidgetContentModel) {

  /**
   * Define Howcast model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class HowcastModel
   * @constructor
   */
  var HowcastModel = function HowcastModel() {

    /**
     * Define preferences
     * @memberOf HowcastModel
     * @type {{
     *      howcastEmbedCode: {type: string, disabled: boolean, value:
     *     undefined, visible: boolean}
     * }}
     */
    this.preferences = {
      howcastEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf HowcastModel
     * @type {{}}
     */
    this.rules = {};
  };

  return HowcastModel.extend('HowcastModel', {

    /**
     * Set Howcast embed code
     * @memberOf HowcastModel
     * @param {string} embed
     */
    setHowcastEmbedCode: function setHowcastEmbedCode(embed) {
      this.setPrefs('howcastEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
