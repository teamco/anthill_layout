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
], function defineIssuuModel(BaseModel, WidgetContentModel) {

  /**
   * Define Issuu model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class IssuuModel
   * @constructor
   */
  var IssuuModel = function IssuuModel() {

    /**
     * Define preferences
     * @memberOf IssuuModel
     * @type {{
         *      issuuEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      issuuEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf IssuuModel
     * @type {{}}
     */
    this.rules = {};
  };

  return IssuuModel.extend('IssuuModel', {

    /**
     * Set Issuu embed code
     * @memberOf IssuuModel
     * @param {string} embed
     */
    setIssuuEmbedCode: function setIssuuEmbedCode(embed) {
      this.setPrefs('issuuEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
