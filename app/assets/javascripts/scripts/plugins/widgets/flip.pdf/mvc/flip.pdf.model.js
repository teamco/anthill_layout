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
], function defineFlipPdfModel(BaseModel, WidgetContentModel) {

  /**
   * Define FlipPdf model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class FlipPdfModel
   * @constructor
   */
  var FlipPdfModel = function FlipPdfModel() {

    /**
     * Define preferences
     * @property FlipPdfModel
     * @type {{
         *      flippdfEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      flippdfEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @property FlipPdfModel
     * @type {{}}
     */
    this.rules = {};
  };

  return FlipPdfModel.extend('FlipPdfModel', {

    /**
     * Set FlipPdf embed code
     * @memberOf FlipPdfModel
     * @param {string} embed
     */
    setFlippdfEmbedCode: function setFlippdfEmbedCode(embed) {
      this.setPrefs('flippdfEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
