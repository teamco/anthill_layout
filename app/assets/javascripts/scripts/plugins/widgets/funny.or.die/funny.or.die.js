/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/funny.or.die/mvc/funny.or.die.controller',
  'plugins/widgets/funny.or.die/mvc/funny.or.die.model',
  'plugins/widgets/funny.or.die/mvc/funny.or.die.view',
  'plugins/widgets/funny.or.die/mvc/funny.or.die.event.manager',
  'plugins/widgets/funny.or.die/mvc/funny.or.die.permission'
], function defineFunnyOrDie(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define FunnyOrDie
   * @param containment
   * @param [opts]
   * @constructor
   * @class FunnyOrDie
   * @extends AntHill
   */
  var FunnyOrDie = function FunnyOrDie(containment, opts) {

    /**
     * Define containment
     * @property FunnyOrDie
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property FunnyOrDie
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
      },
      regex: /embed\/?(\w+)/,
      mask: 'http://www.funnyordie.com/embed/{id}'
    };

    /**
     * Define MVC
     * @property FunnyOrDie
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

  return FunnyOrDie.extend('FunnyOrDie', {}, AntHill.prototype);
});
