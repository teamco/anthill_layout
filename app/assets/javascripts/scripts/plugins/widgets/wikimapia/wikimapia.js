/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/wikimapia/mvc/wikimapia.controller',
  'plugins/widgets/wikimapia/mvc/wikimapia.model',
  'plugins/widgets/wikimapia/mvc/wikimapia.view',
  'plugins/widgets/wikimapia/mvc/wikimapia.event.manager',
  'plugins/widgets/wikimapia/mvc/wikimapia.permission'
], function defineWikimapia(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Wikimapia
   * @param containment
   * @param [opts]
   * @constructor
   * @class Wikimapia
   * @extends AntHill
   */
  var Wikimapia = function Wikimapia(containment, opts) {

    /**
     * Define containment
     * @property Wikimapia
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Wikimapia
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
     * @property Wikimapia
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

  return Wikimapia.extend('Wikimapia', {}, AntHill.prototype);
});
