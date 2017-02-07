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
], function defineChannelTenIlModel(BaseModel, WidgetContentModel) {

  /**
   * Define ChannelTenIl model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class ChannelTenIlModel
   * @constructor
   */
  var ChannelTenIlModel = function ChannelTenIlModel() {

    /**
     * Define preferences
     * @memberOf ChannelTenIlModel
     * @type {{
         *      channeltenilEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      channeltenilEmbedCode: {
        type: 'textarea',
        disabled: true,
        value: '<object class="CTPlayer" type="application/x-shockwave-flash" data="http://hlslive.ch10.cloudvideoplatform.com/CTMLivePlayer.swf?0.4712812292855233" width="576" height="462" style="display: block !important;"><param name="quality" value="high"><param name="bgcolor" value="#000000"><param name="allowScriptAccess" value="always"><param name="wmode" value="direct"><param name="allowFullScreen" value="true"><param name="flashvars" value="AutoPlay=true&dfpadunit=CDN_10TV&PathToPlayer=http://hlslive.ch10.cloudvideoplatform.com/"></object>',
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf ChannelTenIlModel
     * @type {{}}
     */
    this.rules = {};
  };

  return ChannelTenIlModel.extend('ChannelTenIlModel', {

    /**
     * Set ChannelTenIl embed code
     * @memberOf ChannelTenIlModel
     * @param {string} embed
     */
    setChanneltenilEmbedCode: function setChanneltenilEmbedCode(embed) {
      this.setPrefs('channeltenilEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
