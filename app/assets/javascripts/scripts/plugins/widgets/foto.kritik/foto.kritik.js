/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/foto.kritik/mvc/foto.kritik.controller',
  'plugins/widgets/foto.kritik/mvc/foto.kritik.model',
  'plugins/widgets/foto.kritik/mvc/foto.kritik.view',
  'plugins/widgets/foto.kritik/mvc/foto.kritik.event.manager',
  'plugins/widgets/foto.kritik/mvc/foto.kritik.permission'
], function defineFotoKritik(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define FotoKritik
   * @param containment
   * @param [opts]
   * @constructor
   * @class FotoKritik
   * @extends AntHill
   */
  var FotoKritik = function FotoKritik(containment, opts) {

    /**
     * Define containment
     * @property FotoKritik
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property FotoKritik
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
     * @property FotoKritik
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

  return FotoKritik.extend('FotoKritik', {}, AntHill.prototype);
});
