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
], function defineElevenChannelUaModel(BaseModel, WidgetContentModel) {

  /**
   * Define ElevenChannelUa model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class ElevenChannelUaModel
   * @constructor
   */
  var ElevenChannelUaModel = function ElevenChannelUaModel() {

    /**
     * Define preferences
     * @memberOf ElevenChannelUaModel
     * @type {{
         *      elevenchanneluaEmbedCode: {type: string, disabled: boolean,
         *     value: undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      elevenchanneluaEmbedCode: {
        type: 'textarea',
        disabled: true,
        value: '<embed type="application/x-shockwave-flash" src="http://11channel.dp.ua/res/broadcast/player.swf" id="mpl" name="mpl" quality="high" allowfullscreen="true" allowscriptaccess="always" wmode="opaque" flashvars="author=TV Company 11 channel, Dnepropetrovsk, Ukraine&description=TV company 11 channel, Dnipropetrovsk (Dnepropetrovsk) City, Ukraine. News of Ukraine and the world, the program of transfers and announcements. The air, thematic and chronological search in archive. Online Broadcast. The information on the company, new projects and many other things.&file=livestream.flv&image=http://www.11channel.dp.ua/res/broadcast/11logo-pl.jpg&title=TV Company 11 channel, Dnepropetrovsk, Ukraine&backcolor=F4F4DF&bufferlength=5&volume=50&plugins=gapro-1&gapro.accountid=UA-5434280-1&streamer=rtmp://212.3.106.230/live&autostart=true&stretching=fill">',
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf ElevenChannelUaModel
     * @type {{}}
     */
    this.rules = {};
  };

  return ElevenChannelUaModel.extend('ElevenChannelUaModel', {

    /**
     * Set ElevenChannelUa embed code
     * @memberOf ElevenChannelUaModel
     * @param {string} embed
     */
    setElevenchanneluaEmbedCode: function setElevenchanneluaEmbedCode(embed) {
      this.setPrefs('elevenchanneluaEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
