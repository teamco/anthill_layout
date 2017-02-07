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
], function defineIctvModel(BaseModel, WidgetContentModel) {

  /**
   * Define Ictv model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class IctvModel
   * @constructor
   */
  var IctvModel = function IctvModel() {

    /**
     * Define preferences
     * @memberOf IctvModel
     * @type {{
         *      ictvEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      ictvEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf IctvModel
     * @type {{}}
     */
    this.rules = {};
  };

  return IctvModel.extend('IctvModel', {

    /**
     * Set Ictv embed code
     * @memberOf IctvModel
     * @param {string} embed
     */
    setIctvEmbedCode: function setIctvEmbedCode(embed) {
      this.setPrefs('ictvEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
