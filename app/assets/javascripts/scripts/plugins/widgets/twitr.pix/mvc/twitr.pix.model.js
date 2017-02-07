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
], function defineTwitrPixModel(BaseModel, WidgetContentModel) {

  /**
   * Define TwitrPix model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class TwitrPixModel
   * @constructor
   */
  var TwitrPixModel = function TwitrPixModel() {

    /**
     * Define preferences
     * @memberOf TwitrPixModel
     * @type {{
         *      twitrpixEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      twitrpixEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf TwitrPixModel
     * @type {{}}
     */
    this.rules = {};
  };

  return TwitrPixModel.extend('TwitrPixModel', {

    /**
     * Set TwitrPix embed code
     * @memberOf TwitrPixModel
     * @param {string} embed
     */
    setTwitrpixEmbedCode: function setTwitrpixEmbedCode(embed) {
      this.setPrefs('twitrpixEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
