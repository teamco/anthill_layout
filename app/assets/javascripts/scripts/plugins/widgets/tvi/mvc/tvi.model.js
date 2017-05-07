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
], function defineTviModel(BaseModel, WidgetContentModel) {

  /**
   * Define Tvi model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class TviModel
   * @constructor
   */
  var TviModel = function TviModel() {

    /**
     * Define preferences
     * @memberOf TviModel
     * @type {{
         *      tviEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      tviEmbedCode: {
        type: 'text',
        disabled: true,
        value: 'https://www.youtube.com/watch?feature=player_embedded&v=gCEDpbvT3MY',
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf TviModel
     * @type {{}}
     */
    this.rules = {};
  };

  return TviModel.extend('TviModel', {

    /**
     * Set Tvi embed code
     * @memberOf TviModel
     * @param {string} embed
     */
    setTviEmbedCode: function setTviEmbedCode(embed) {
      this.setPrefs('tviEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
