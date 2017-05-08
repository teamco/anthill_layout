/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/twenty.four.live/mvc/twenty.four.live.controller',
  'plugins/widgets/twenty.four.live/mvc/twenty.four.live.model',
  'plugins/widgets/twenty.four.live/mvc/twenty.four.live.view',
  'plugins/widgets/twenty.four.live/mvc/twenty.four.live.event.manager',
  'plugins/widgets/twenty.four.live/mvc/twenty.four.live.permission'
], function defineTwentyFourLive(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define TwentyFourLive
   * @param containment
   * @param [opts]
   * @constructor
   * @class TwentyFourLive
   * @extends AntHill
   */
  var TwentyFourLive = function TwentyFourLive(containment, opts) {

    /**
     * Define containment
     * @memberOf TwentyFourLive
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf TwentyFourLive
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
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      },
         *      regex: RegExp,
         *      mask: string
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
      },
      regex: /^.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
      mask: 'https://www.youtube.com/embed/{videoId}'
    };

    /**
     * Define MVC
     * @memberOf TwentyFourLive
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

  return TwentyFourLive.extend('TwentyFourLive', {}, AntHill.prototype);
});
