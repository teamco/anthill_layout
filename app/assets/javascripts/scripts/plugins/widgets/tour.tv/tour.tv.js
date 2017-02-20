/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/tour.tv/mvc/tour.tv.controller',
  'plugins/widgets/tour.tv/mvc/tour.tv.model',
  'plugins/widgets/tour.tv/mvc/tour.tv.view',
  'plugins/widgets/tour.tv/mvc/tour.tv.event.manager',
  'plugins/widgets/tour.tv/mvc/tour.tv.permission'
], function defineTourTv(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define TourTv
   * @param containment
   * @param [opts]
   * @constructor
   * @class TourTv
   * @extends AntHill
   */
  var TourTv = function TourTv(containment, opts) {

    /**
     * Define containment
     * @memberOf TourTv
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf TourTv
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
     * @memberOf TourTv
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

  return TourTv.extend('TourTv', {}, AntHill.prototype);
});
