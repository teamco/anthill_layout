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
], function defineWebrtcVideoChatModel(BaseModel, WidgetContentModel) {

  /**
   * Define WebrtcVideoChat model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class WebrtcVideoChatModel
   * @constructor
   */
  var WebrtcVideoChatModel = function WebrtcVideoChatModel() {

    /**
     * Define preferences
     * @property WebrtcVideoChatModel
     * @type {{}}
     */
    this.preferences = {
      webrtcvideochatPubNub: {
        type: 'text',
        disabled: true,
        value: '//cdn.pubnub.com/pubnub-3.7.14.min.js',
        visible: true
      },
      webrtcvideochatWebRtc: {
        type: 'text',
        disabled: true,
        value: '//cdn.pubnub.com/webrtc/webrtc.js',
        visible: true
      },
      webrtcvideochatPublish: {
        type: 'text',
        disabled: true,
        value: 'pub-c-b5cb7469-7a1d-40f6-8c68-ac087b5e4315',
        visible: false
      },
      webrtcvideochatSubscribe: {
        type: 'text',
        disabled: true,
        value: 'sub-c-914c28e4-4c2d-11e5-854b-02ee2ddab7fe',
        visible: false
      }
    };

    /**
     * Define rules
     * @property WebrtcVideoChatModel
     * @type {{}}
     */
    this.rules = {};
  };

  return WebrtcVideoChatModel.extend('WebrtcVideoChatModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
