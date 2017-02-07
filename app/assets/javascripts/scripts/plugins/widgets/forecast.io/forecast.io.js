/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/forecast.io/mvc/forecast.io.controller',
  'plugins/widgets/forecast.io/mvc/forecast.io.model',
  'plugins/widgets/forecast.io/mvc/forecast.io.view',
  'plugins/widgets/forecast.io/mvc/forecast.io.event.manager',
  'plugins/widgets/forecast.io/mvc/forecast.io.permission'
], function defineForecastIo(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define ForecastIo
   * @param containment
   * @param [opts]
   * @constructor
   * @class ForecastIo
   * @extends AntHill
   */
  var ForecastIo = function ForecastIo(containment, opts) {

    /**
     * Define containment
     * @property ForecastIo
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property ForecastIo
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
     * @property ForecastIo
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

  return ForecastIo.extend('ForecastIo', {}, AntHill.prototype);
});
