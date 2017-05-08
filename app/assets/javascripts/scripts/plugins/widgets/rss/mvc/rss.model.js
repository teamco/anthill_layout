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
], function defineRssModel(BaseModel, WidgetContentModel) {

  /**
   * Define Rss model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class RssModel
   * @constructor
   */
  var RssModel = function RssModel() {

    /**
     * Define preferences
     * @memberOf RssModel
     * @type {{
         *      rssUrl: {type: string, disabled: boolean, value: undefined,
         *     visible: boolean}
         * }}
     */
    this.preferences = {
      rssFeedUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf RssModel
     * @type {{}}
     */
    this.rules = {};
  };

  return RssModel.extend('RssModel', {

    /**
     * Set Rss Feed Url
     * @memberOf RssModel
     * @param {string} url
     */
    setRssFeedUrl: function setRssFeedUrl(url) {
      this.setPrefs('rssFeedUrl', url);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});