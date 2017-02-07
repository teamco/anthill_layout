/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/live.amcharts/mvc/live.amcharts.controller',
  'plugins/widgets/live.amcharts/mvc/live.amcharts.model',
  'plugins/widgets/live.amcharts/mvc/live.amcharts.view',
  'plugins/widgets/live.amcharts/mvc/live.amcharts.event.manager',
  'plugins/widgets/live.amcharts/mvc/live.amcharts.permission'
], function defineLiveAmcharts(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define LiveAmcharts
   * @param containment
   * @param [opts]
   * @constructor
   * @class LiveAmcharts
   * @extends AntHill
   */
  var LiveAmcharts = function LiveAmcharts(containment, opts) {

    /**
     * Define containment
     * @property LiveAmcharts
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property LiveAmcharts
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
     * @property LiveAmcharts
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

  return LiveAmcharts.extend('LiveAmcharts', {}, AntHill.prototype);
});
