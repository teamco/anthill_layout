/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/here.maps.for.life/mvc/here.maps.for.life.controller',
  'plugins/widgets/here.maps.for.life/mvc/here.maps.for.life.model',
  'plugins/widgets/here.maps.for.life/mvc/here.maps.for.life.view',
  'plugins/widgets/here.maps.for.life/mvc/here.maps.for.life.event.manager',
  'plugins/widgets/here.maps.for.life/mvc/here.maps.for.life.permission'
], function defineHereMapsForLife(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define HereMapsForLife
   * @param containment
   * @param [opts]
   * @constructor
   * @class HereMapsForLife
   * @extends AntHill
   */
  var HereMapsForLife = function HereMapsForLife(containment, opts) {

    /**
     * Define containment
     * @property HereMapsForLife
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property HereMapsForLife
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
     *      },
     *      lib: {css, js}
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
      lib: {
        css: 'https://js.api.here.com/v3/3.0/mapsjs-ui.css',
        js: [
          'https://js.api.here.com/v3/3.0/mapsjs-core.js',
          'https://js.api.here.com/v3/3.0/mapsjs-service.js',
          'https://js.api.here.com/v3/3.0/mapsjs-ui.js',
          'https://js.api.here.com/v3/3.0/mapsjs-mapevents.js'
        ]
      }
    };

    /**
     * Define MVC
     * @property HereMapsForLife
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

  return HereMapsForLife.extend('HereMapsForLife', {}, AntHill.prototype);
});
