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
], function defineUbrModel(BaseModel, WidgetContentModel) {

  /**
   * Define Ubr model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class UbrModel
   * @constructor
   */
  var UbrModel = function UbrModel() {

    /**
     * Define preferences
     * @memberOf UbrModel
     * @type {{
         *      ubrEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      ubrEmbedCode: {
        type: 'text',
        disabled: true,
        value: 'https://www.youtube.com/watch?feature=player_embedded&v=VqbWCiuegkU',
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf UbrModel
     * @type {{}}
     */
    this.rules = {};
  };

  return UbrModel.extend('UbrModel', {

    /**
     * Set Ubr embed code
     * @memberOf UbrModel
     * @param {string} embed
     */
    setUbrEmbedCode: function setUbrEmbedCode(embed) {
      this.setPrefs('ubrEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
