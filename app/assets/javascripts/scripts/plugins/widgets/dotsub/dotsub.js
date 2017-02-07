/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/dotsub/mvc/dotsub.controller',
  'plugins/widgets/dotsub/mvc/dotsub.model',
  'plugins/widgets/dotsub/mvc/dotsub.view',
  'plugins/widgets/dotsub/mvc/dotsub.event.manager',
  'plugins/widgets/dotsub/mvc/dotsub.permission'
], function defineDotsub(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Dotsub
   * @param containment
   * @param [opts]
   * @constructor
   * @class Dotsub
   * @extends AntHill
   */
  var Dotsub = function Dotsub(containment, opts) {

    /**
     * Define containment
     * @property Dotsub
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Dotsub
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
     * @property Dotsub
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

  return Dotsub.extend('Dotsub', {}, AntHill.prototype);
});
