/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/tvi/mvc/tvi.controller',
  'plugins/widgets/tvi/mvc/tvi.model',
  'plugins/widgets/tvi/mvc/tvi.view',
  'plugins/widgets/tvi/mvc/tvi.event.manager',
  'plugins/widgets/tvi/mvc/tvi.permission'
], function defineTvi(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Tvi
   * @param containment
   * @param [opts]
   * @constructor
   * @class Tvi
   * @extends AntHill
   */
  var Tvi = function Tvi(containment, opts) {

    /**
     * Define containment
     * @memberOf Tvi
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Tvi
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
     * @memberOf Tvi
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

  return Tvi.extend('Tvi', {}, AntHill.prototype);
});
