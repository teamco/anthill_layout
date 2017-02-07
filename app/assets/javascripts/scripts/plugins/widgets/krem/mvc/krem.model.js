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
], function defineKremModel(BaseModel, WidgetContentModel) {

  /**
   * Define Krem model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class KremModel
   * @constructor
   */
  var KremModel = function KremModel() {

    /**
     * Define preferences
     * @memberOf KremModel
     * @type {{
         *      kremEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      kremEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf KremModel
     * @type {{}}
     */
    this.rules = {};
  };

  return KremModel.extend('KremModel', {

    /**
     * Set Krem embed code
     * @memberOf KremModel
     * @param {string} embed
     */
    setKremEmbedCode: function setKremEmbedCode(embed) {
      this.setPrefs('kremEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
