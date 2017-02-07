/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/channel.nine.ua/mvc/channel.nine.ua.controller',
  'plugins/widgets/channel.nine.ua/mvc/channel.nine.ua.model',
  'plugins/widgets/channel.nine.ua/mvc/channel.nine.ua.view',
  'plugins/widgets/channel.nine.ua/mvc/channel.nine.ua.event.manager',
  'plugins/widgets/channel.nine.ua/mvc/channel.nine.ua.permission'
], function defineChannelNineUa(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define ChannelNineUa
   * @param containment
   * @param [opts]
   * @constructor
   * @class ChannelNineUa
   * @extends AntHill
   */
  var ChannelNineUa = function ChannelNineUa(containment, opts) {

    /**
     * Define containment
     * @property ChannelNineUa
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property ChannelNineUa
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
      }
    };

    /**
     * Define MVC
     * @property ChannelNineUa
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

  return ChannelNineUa.extend('ChannelNineUa', {}, AntHill.prototype);
});
