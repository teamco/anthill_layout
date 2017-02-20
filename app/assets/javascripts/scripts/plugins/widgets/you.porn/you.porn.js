/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/you.porn/mvc/you.porn.controller',
  'plugins/widgets/you.porn/mvc/you.porn.model',
  'plugins/widgets/you.porn/mvc/you.porn.view',
  'plugins/widgets/you.porn/mvc/you.porn.event.manager',
  'plugins/widgets/you.porn/mvc/you.porn.permission'
], function defineYouPorn(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define YouPorn
   * @param containment
   * @param [opts]
   * @constructor
   * @class YouPorn
   * @extends AntHill
   */
  var YouPorn = function YouPorn(containment, opts) {

    /**
     * Define containment
     * @memberOf YouPorn
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf YouPorn
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
     * @memberOf YouPorn
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

  return YouPorn.extend('YouPorn', {}, AntHill.prototype);
});
