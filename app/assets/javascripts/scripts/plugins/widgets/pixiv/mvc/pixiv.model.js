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
], function definePixivModel(BaseModel, WidgetContentModel) {

  /**
   * Define Pixiv model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class PixivModel
   * @constructor
   */
  var PixivModel = function PixivModel() {

    /**
     * Define preferences
     * @memberOf PixivModel
     * @type {{
         *      pixivEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      pixivEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf PixivModel
     * @type {{}}
     */
    this.rules = {};
  };

  return PixivModel.extend('PixivModel', {

    /**
     * Set Pixiv embed code
     * @memberOf PixivModel
     * @param {string} embed
     */
    setPixivEmbedCode: function setPixivEmbedCode(embed) {
      this.setPrefs('pixivEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
