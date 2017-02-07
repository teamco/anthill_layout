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
], function defineIsnareModel(BaseModel, WidgetContentModel) {

  /**
   * Define Isnare model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class IsnareModel
   * @constructor
   */
  var IsnareModel = function IsnareModel() {

    /**
     * Define preferences
     * @memberOf IsnareModel
     * @type {{
         *      isnareEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      isnareEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf IsnareModel
     * @type {{}}
     */
    this.rules = {};
  };

  return IsnareModel.extend('IsnareModel', {

    /**
     * Set Isnare embed code
     * @memberOf IsnareModel
     * @param {string} embed
     */
    setIsnareEmbedCode: function setIsnareEmbedCode(embed) {
      this.setPrefs('isnareEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
