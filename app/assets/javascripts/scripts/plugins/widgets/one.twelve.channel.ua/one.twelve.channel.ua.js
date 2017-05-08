/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/one.twelve.channel.ua/mvc/one.twelve.channel.ua.controller',
  'plugins/widgets/one.twelve.channel.ua/mvc/one.twelve.channel.ua.model',
  'plugins/widgets/one.twelve.channel.ua/mvc/one.twelve.channel.ua.view',
  'plugins/widgets/one.twelve.channel.ua/mvc/one.twelve.channel.ua.event.manager',
  'plugins/widgets/one.twelve.channel.ua/mvc/one.twelve.channel.ua.permission'
], function defineOneTwelveChannelUa(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define OneTwelveChannelUa
   * @param containment
   * @param [opts]
   * @constructor
   * @class OneTwelveChannelUa
   * @extends AntHill
   */
  var OneTwelveChannelUa = function OneTwelveChannelUa(containment, opts) {

    /**
     * Define containment
     * @memberOf OneTwelveChannelUa
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf OneTwelveChannelUa
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
     * @memberOf OneTwelveChannelUa
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

  return OneTwelveChannelUa.extend('OneTwelveChannelUa', {}, AntHill.prototype);
});
