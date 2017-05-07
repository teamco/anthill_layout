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
], function defineTsnUaModel(BaseModel, WidgetContentModel) {

  /**
   * Define TsnUa model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class TsnUaModel
   * @constructor
   */
  var TsnUaModel = function TsnUaModel() {

    /**
     * Define preferences
     * @memberOf TsnUaModel
     * @type {{
         *      tsnuaEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      tsnuaEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf TsnUaModel
     * @type {{}}
     */
    this.rules = {};
  };

  return TsnUaModel.extend('TsnUaModel', {

    /**
     * Set TsnUa embed code
     * @memberOf TsnUaModel
     * @param {string} embed
     */
    setTsnuaEmbedCode: function setTsnuaEmbedCode(embed) {
      this.setPrefs('tsnuaEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
