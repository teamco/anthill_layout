/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/edocr/mvc/edocr.controller',
  'plugins/widgets/edocr/mvc/edocr.model',
  'plugins/widgets/edocr/mvc/edocr.view',
  'plugins/widgets/edocr/mvc/edocr.event.manager',
  'plugins/widgets/edocr/mvc/edocr.permission'
], function defineEdocr(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Edocr
   * @param containment
   * @param [opts]
   * @constructor
   * @class Edocr
   * @extends AntHill
   */
  var Edocr = function Edocr(containment, opts) {

    /**
     * Define containment
     * @property Edocr
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Edocr
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
     * @property Edocr
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

  return Edocr.extend('Edocr', {}, AntHill.prototype);
});
