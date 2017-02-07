/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/accuweather.videos/mvc/accuweather.videos.controller',
  'plugins/widgets/accuweather.videos/mvc/accuweather.videos.model',
  'plugins/widgets/accuweather.videos/mvc/accuweather.videos.view',
  'plugins/widgets/accuweather.videos/mvc/accuweather.videos.event.manager',
  'plugins/widgets/accuweather.videos/mvc/accuweather.videos.permission'
], function defineAccuweatherVideos(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define AccuweatherVideos
   * @param containment
   * @param [opts]
   * @constructor
   * @class AccuweatherVideos
   * @extends AntHill
   */
  var AccuweatherVideos = function AccuweatherVideos(containment, opts) {

    /**
     * Define containment
     * @property AccuweatherVideos
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property AccuweatherVideos
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
     * @property AccuweatherVideos
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

  return AccuweatherVideos.extend('AccuweatherVideos', {}, AntHill.prototype);
});
