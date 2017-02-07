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
], function defineGooglePlusModel(BaseModel, WidgetContentModel) {

  /**
   * Define GooglePlus model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class GooglePlusModel
   * @constructor
   */
  var GooglePlusModel = function GooglePlusModel() {

    /**
     * Define preferences
     * @memberOf GooglePlusModel
     * @type {{
         *      googlePlusApi: {type: string, disabled: boolean, value: string,
         *     visible: boolean}, googlePlusUrl: {type: string, disabled:
         *     boolean, value: undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      googlePlusApi: {
        type: 'text',
        disabled: true,
        value: 'https://apis.google.com/js/platform.js',
        visible: true
      },
      googlePlusUrl: {
        type: 'text',
        disabled: false,
        value: 'https://plus.google.com/110174288943220639247/posts/cfjDgZ7zK8o',
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf GooglePlusModel
     * @type {{}}
     */
    this.rules = {};
  };

  return GooglePlusModel.extend('GooglePlusModel', {

    /**
     * Set google plus url
     * @memberOf GooglePlusModel
     * @param {string} url
     */
    setGooglePlusUrl: function setGooglePlusUrl(url) {
      this.setPrefs('googlePlusUrl', url);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
