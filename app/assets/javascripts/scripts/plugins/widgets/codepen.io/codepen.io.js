/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/codepen.io/mvc/codepen.io.controller',
  'plugins/widgets/codepen.io/mvc/codepen.io.model',
  'plugins/widgets/codepen.io/mvc/codepen.io.view',
  'plugins/widgets/codepen.io/mvc/codepen.io.event.manager',
  'plugins/widgets/codepen.io/mvc/codepen.io.permission'
], function defineCodepenIo(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define CodepenIo
   * @param containment
   * @param [opts]
   * @constructor
   * @class CodepenIo
   * @extends AntHill
   */
  var CodepenIo = function CodepenIo(containment, opts) {

    /**
     * Define containment
     * @property CodepenIo
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property CodepenIo
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
     * @property CodepenIo
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

  return CodepenIo.extend('CodepenIo', {}, AntHill.prototype);
});
