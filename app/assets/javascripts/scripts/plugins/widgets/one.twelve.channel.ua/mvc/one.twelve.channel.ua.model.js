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
], function defineOneTwelveChannelUaModel(BaseModel, WidgetContentModel) {

  /**
   * Define OneTwelveChannelUa model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class OneTwelveChannelUaModel
   * @constructor
   */
  var OneTwelveChannelUaModel = function OneTwelveChannelUaModel() {

    /**
     * Define preferences
     * @memberOf OneTwelveChannelUaModel
     * @type {{
         *      onetwelvechanneluaEmbedCode: {type: string, disabled: boolean,
         *     value: undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      onetwelvechanneluaEmbedCode: {
        type: 'textarea',
        disabled: true,
        value: '<object id="mp76686" width="510" height="400"><param name="allowScriptAccess" value="always"><param name="movie" value="http://fpdownload.adobe.com/strobe/FlashMediaPlayback_101.swf?src=rtmp://31.28.169.242/live/live112&streamType=live&autoPlay=true"><embed src="http://fpdownload.adobe.com/strobe/FlashMediaPlayback_101.swf?src=rtmp://31.28.169.242/live/live112&streamType=live&autoPlay=true" type="application/x-shockwave-flash" allowscriptaccess="always" width="510" height="400" allowfullscreen="true" name="mp76686"></object>',
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf OneTwelveChannelUaModel
     * @type {{}}
     */
    this.rules = {};
  };

  return OneTwelveChannelUaModel.extend('OneTwelveChannelUaModel', {

    /**
     * Set OneTwelveChannelUa embed code
     * @memberOf OneTwelveChannelUaModel
     * @param {string} embed
     */
    setOnetwelvechanneluaEmbedCode: function setOnetwelvechanneluaEmbedCode(embed) {
      this.setPrefs('onetwelvechanneluaEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
