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
], function defineEmbedlyModel(BaseModel, WidgetContentModel) {

  /**
   * Define Embedly model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class EmbedlyModel
   * @constructor
   */
  var EmbedlyModel = function EmbedlyModel() {

    /**
     * Define preferences
     * @memberOf EmbedlyModel
     * @type {{
     *      embedlyUrl: {type: string, disabled: boolean, value: undefined,
     *     visible: boolean}, embedlyJson: {type: string, disabled:
     *     boolean, value: undefined, visible: boolean}
     * }}
     */
    this.preferences = {
      embedlyUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      embedlyJson: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: false
      }
    };

    /**
     * Define rules
     * @memberOf EmbedlyModel
     * @type {{}}
     */
    this.rules = {};
  };

  return EmbedlyModel.extend('EmbedlyModel', {

    /**
     * Define embedly url setter
     * @memberOf EmbedlyModel
     * @param url
     */
    setEmbedlyUrl: function setEmbedlyUrl(url) {
      this.setPrefs('embedlyUrl', url);
    },

    /**
     * Define embedly url setter
     * @memberOf EmbedlyModel
     * @param json
     */
    setEmbedlyJson: function setEmbedlyJson(json) {
      this.setPrefs('embedlyJson', json);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
