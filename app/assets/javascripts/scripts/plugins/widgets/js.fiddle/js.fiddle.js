/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/js.fiddle/mvc/js.fiddle.controller',
  'plugins/widgets/js.fiddle/mvc/js.fiddle.model',
  'plugins/widgets/js.fiddle/mvc/js.fiddle.view',
  'plugins/widgets/js.fiddle/mvc/js.fiddle.event.manager',
  'plugins/widgets/js.fiddle/mvc/js.fiddle.permission'
], function defineJsFiddle(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define JsFiddle
   * @param containment
   * @param [opts]
   * @constructor
   * @class JsFiddle
   * @extends AntHill
   */
  var JsFiddle = function JsFiddle(containment, opts) {

    /**
     * Define containment
     * @memberOf JsFiddle
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf JsFiddle
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
     * @memberOf JsFiddle
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

  return JsFiddle.extend('JsFiddle', {}, AntHill.prototype);
});
