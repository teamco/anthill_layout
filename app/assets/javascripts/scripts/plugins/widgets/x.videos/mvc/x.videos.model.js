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
], function defineXVideosModel(BaseModel, WidgetContentModel) {

  /**
   * Define XVideos model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class XVideosModel
   * @constructor
   */
  var XVideosModel = function XVideosModel() {

    /**
     * Define preferences
     * @memberOf XVideosModel
     * @type {{
         *      xvideosUrl: {type: string, disabled: boolean, value: undefined,
         *     visible: boolean}
         * }}
     */
    this.preferences = {
      xvideosUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf XVideosModel
     * @type {{}}
     */
    this.rules = {};
  };

  return XVideosModel.extend('XVideosModel', {

    /**
     * Set XVideos Url
     * @memberOf XVideosModel
     * @param {string} url
     */
    setXvideosUrl: function setXvideosUrl(url) {
      this.setPrefs('xvideosUrl', url);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
