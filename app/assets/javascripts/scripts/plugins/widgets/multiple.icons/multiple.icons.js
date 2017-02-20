/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/multiple.icons/mvc/multiple.icons.controller',
  'plugins/widgets/multiple.icons/mvc/multiple.icons.model',
  'plugins/widgets/multiple.icons/mvc/multiple.icons.view',
  'plugins/widgets/multiple.icons/mvc/multiple.icons.event.manager',
  'plugins/widgets/multiple.icons/mvc/multiple.icons.permission'
], function defineMultipleIcons(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define MultipleIcons
   * @param containment
   * @param [opts]
   * @constructor
   * @class MultipleIcons
   * @extends AntHill
   */
  var MultipleIcons = function MultipleIcons(containment, opts) {

    /**
     * Define containment
     * @memberOf MultipleIcons
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf MultipleIcons
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
     * @memberOf MultipleIcons
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

  return MultipleIcons.extend('MultipleIcons', {}, AntHill.prototype);
});