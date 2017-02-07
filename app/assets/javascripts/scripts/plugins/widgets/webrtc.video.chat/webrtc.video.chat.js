/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/webrtc.video.chat/mvc/webrtc.video.chat.controller',
  'plugins/widgets/webrtc.video.chat/mvc/webrtc.video.chat.model',
  'plugins/widgets/webrtc.video.chat/mvc/webrtc.video.chat.view',
  'plugins/widgets/webrtc.video.chat/mvc/webrtc.video.chat.event.manager',
  'plugins/widgets/webrtc.video.chat/mvc/webrtc.video.chat.permission'
], function defineWebrtcVideoChat(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define WebrtcVideoChat
   * @param containment
   * @param [opts]
   * @constructor
   * @class WebrtcVideoChat
   * @extends AntHill
   */
  var WebrtcVideoChat = function WebrtcVideoChat(containment, opts) {

    /**
     * Define containment
     * @property WebrtcVideoChat
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property WebrtcVideoChat
     * @type {*}
     */
    this.referrer = undefined;

    /**
     * Define defaults
     * @type {{
         *      plugin: boolean,
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          floating: boolean,
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      }
         * }}
     */
    var DEFAULTS = {
      plugin: true,
      html: {
        style: 'default',
        header: false,
        footer: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };

    /**
     * Define MVC
     * @property WebrtcVideoChat
     * @type {MVC}
     */
    this.mvc = new MVC({
      scope: this,
      config: [
        {uuid: this.containment.model.getContentUUID()},
        DEFAULTS
      ],
      components: [
        Controller,
        Model,
        View,
        EventManager,
        Permission
      ],
      render: true
    });

    this.observer.publish(
        this.eventmanager.eventList.initWidget,
        opts
    );
  };

  return WebrtcVideoChat.extend('WebrtcVideoChat', {}, AntHill.prototype);
});
