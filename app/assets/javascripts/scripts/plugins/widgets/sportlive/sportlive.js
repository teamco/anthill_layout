/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/sportlive/mvc/sportlive.controller',
  'plugins/widgets/sportlive/mvc/sportlive.model',
  'plugins/widgets/sportlive/mvc/sportlive.view',
  'plugins/widgets/sportlive/mvc/sportlive.event.manager',
  'plugins/widgets/sportlive/mvc/sportlive.permission'
], function defineSportlive(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Sportlive
   * @param containment
   * @param [opts]
   * @constructor
   * @class Sportlive
   * @extends AntHill
   */
  var Sportlive = function Sportlive(containment, opts) {

    /**
     * Define containment
     * @property Sportlive
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Sportlive
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
     * @property Sportlive
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

  return Sportlive.extend('Sportlive', {}, AntHill.prototype);
});
