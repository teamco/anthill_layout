/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/jwplayer/mvc/jwplayer.controller',
  'plugins/widgets/jwplayer/mvc/jwplayer.model',
  'plugins/widgets/jwplayer/mvc/jwplayer.view',
  'plugins/widgets/jwplayer/mvc/jwplayer.event.manager',
  'plugins/widgets/jwplayer/mvc/jwplayer.permission'
], function defineJwplayer(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Jwplayer
   * @param containment
   * @param [opts]
   * @constructor
   * @class Jwplayer
   * @extends AntHill
   */
  var Jwplayer = function Jwplayer(containment, opts) {

    /**
     * Define containment
     * @memberOf Jwplayer
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Jwplayer
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
     * @memberOf Jwplayer
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

  return Jwplayer.extend('Jwplayer', {}, AntHill.prototype);
});