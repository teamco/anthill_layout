/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/dashboard/mvc/dashboard.controller',
  'plugins/dashboard/mvc/dashboard.model',
  'plugins/dashboard/mvc/dashboard.view',
  'plugins/dashboard/mvc/dashboard.event.manager',
  'plugins/dashboard/mvc/dashboard.permission'
], function defineDashboard(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Dashboard
   * @constructor
   * @param containment
   * @class Dashboard
   * @extends AntHill
   */
  var Dashboard = function Dashboard(containment) {

    /**
     * Define containment
     * @property Dashboard
     */
    this.containment = containment;

    /**
     * Define defaults
     * @type {{
         *      plugin: boolean,
         *      getter: boolean,
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
      getter: true,
      html: {
        style: 'default',
        header: true,
        footer: true,
        floating: true,
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
     * @property Dashboard
     * @type {MVC}
     */
    this.mvc = new MVC({
      scope: this,
      config: [DEFAULTS],
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
        this.eventmanager.eventList.successCreated
    );

    this.observer.publish(
        this.eventmanager.eventList.updateTranslations,
        ['plugins/dashboard/translations/en-us']
    );
  };

  return Dashboard.extend('Dashboard', {}, AntHill.prototype);
});