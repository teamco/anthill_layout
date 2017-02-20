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
], function defineTedModel(BaseModel, WidgetContentModel) {

  /**
   * Define Ted model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class TedModel
   * @constructor
   */
  var TedModel = function TedModel() {

    /**
     * Define preferences
     * @memberOf TedModel
     * @type {{
         *      tedEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      tedEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf TedModel
     * @type {{}}
     */
    this.rules = {};
  };

  return TedModel.extend('TedModel', {

    /**
     * Set Ted embed code
     * @memberOf TedModel
     * @param {string} embed
     */
    setTedEmbedCode: function setTedEmbedCode(embed) {
      this.setPrefs('tedEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
