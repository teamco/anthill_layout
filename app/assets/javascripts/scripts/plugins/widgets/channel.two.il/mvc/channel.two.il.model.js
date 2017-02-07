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
], function defineChannelTwoIlModel(BaseModel, WidgetContentModel) {

  /**
   * Define ChannelTwoIl model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class ChannelTwoIlModel
   * @constructor
   */
  var ChannelTwoIlModel = function ChannelTwoIlModel() {

    /**
     * Define preferences
     * @memberOf ChannelTwoIlModel
     * @type {{
         *      channeltwoilEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      channeltwoilEmbedCode: {
        type: 'textarea',
        disabled: true,
        value: '<object id="flashObj" width="600" height="400" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,47,0" style="display: block !important;"><param name="movie" value="http://c.brightcove.com/services/viewer/federated_f9?isVid=1&isUI=1"><param name="bgcolor" value="#FFFFFF"><param name="flashVars" value="videoId=3602620704001&playerID=2421594334001&playerKey=AQ~~,AAABaSVvvhE~,kYID6H47O2tAcDweni1F1ch1Ow6ywkJU&domain=embed&dynamicStreaming=true"><param name="base" value="http://admin.brightcove.com"><param name="seamlesstabbing" value="false"><param name="allowFullScreen" value="true"><param name="swLiveConnect" value="true"><param name="allowScriptAccess" value="always"><embed wmode="transparent" src="http://c.brightcove.com/services/viewer/federated_f9?isVid=1&isUI=1" bgcolor="#FFFFFF" flashvars="videoId=3602620704001&playerID=2421594334001&playerKey=AQ~~,AAABaSVvvhE~,kYID6H47O2tAcDweni1F1ch1Ow6ywkJU&domain=embed&dynamicStreaming=true" base="http://admin.brightcove.com" name="flashObj" width="600" height="400" seamlesstabbing="false" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" swliveconnect="true" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" rt_live_added="1" style="display: block !important;"></object>',
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf ChannelTwoIlModel
     * @type {{}}
     */
    this.rules = {};
  };

  return ChannelTwoIlModel.extend('ChannelTwoIlModel', {

    /**
     * Set ChannelTwoIl embed code
     * @memberOf ChannelTwoIlModel
     * @param {string} embed
     */
    setChanneltwoilEmbedCode: function setChanneltwoilEmbedCode(embed) {
      this.setPrefs('channeltwoilEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
