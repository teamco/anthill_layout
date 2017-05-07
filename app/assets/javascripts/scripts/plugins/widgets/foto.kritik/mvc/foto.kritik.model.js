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
], function defineFotoKritikModel(BaseModel, WidgetContentModel) {

  /**
   * Define FotoKritik model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class FotoKritikModel
   * @constructor
   */
  var FotoKritikModel = function FotoKritikModel() {

    /**
     * Define preferences
     * @property FotoKritikModel
     * @type {{
     *      fotokritikEmbedCode: {type: string, disabled: boolean, value:
     *     undefined, visible: boolean}
     * }}
     */
    this.preferences = {
      fotokritikEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @property FotoKritikModel
     * @type {{}}
     */
    this.rules = {};
  };

  return FotoKritikModel.extend('FotoKritikModel', {

    /**
     * Set FotoKritik embed code
     * @memberOf FotoKritikModel
     * @param {string} embed
     */
    setFotokritikEmbedCode: function setFotokritikEmbedCode(embed) {
      this.setPrefs('fotokritikEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
