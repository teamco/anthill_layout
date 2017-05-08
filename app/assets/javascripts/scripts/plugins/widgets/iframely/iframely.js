/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/iframely/mvc/iframely.controller',
  'plugins/widgets/iframely/mvc/iframely.model',
  'plugins/widgets/iframely/mvc/iframely.view',
  'plugins/widgets/iframely/mvc/iframely.event.manager',
  'plugins/widgets/iframely/mvc/iframely.permission'
], function defineIframely(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Iframely
   * @param containment
   * @param [opts]
   * @constructor
   * @class Iframely
   * @extends AntHill
   */
  var Iframely = function Iframely(containment, opts) {

    /**
     * Define containment
     * @property Iframely
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Iframely
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
     * @property Iframely
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

  return Iframely.extend('Iframely', {}, AntHill.prototype);
});
