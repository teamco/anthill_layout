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
], function defineDeviantArtModel(BaseModel, WidgetContentModel) {

  /**
   * Define DeviantArt model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class DeviantArtModel
   * @constructor
   */
  var DeviantArtModel = function DeviantArtModel() {

    /**
     * Define preferences
     * @memberOf DeviantArtModel
     * @type {{
     *      deviantartEmbedCode: {type: string, disabled: boolean, value:
     *     undefined, visible: boolean}
     * }}
     */
    this.preferences = {
      deviantartEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf DeviantArtModel
     * @type {{}}
     */
    this.rules = {};
  };

  return DeviantArtModel.extend('DeviantArtModel', {

    /**
     * Set DeviantArt embed code
     * @memberOf DeviantArtModel
     * @param {string} embed
     */
    setDeviantartEmbedCode: function setDeviantartEmbedCode(embed) {
      this.setPrefs('deviantartEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
