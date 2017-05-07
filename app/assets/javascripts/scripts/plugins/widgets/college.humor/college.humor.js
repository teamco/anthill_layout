/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/college.humor/mvc/college.humor.controller',
  'plugins/widgets/college.humor/mvc/college.humor.model',
  'plugins/widgets/college.humor/mvc/college.humor.view',
  'plugins/widgets/college.humor/mvc/college.humor.event.manager',
  'plugins/widgets/college.humor/mvc/college.humor.permission'
], function defineCollegeHumor(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define CollegeHumor
   * @param containment
   * @param [opts]
   * @constructor
   * @class CollegeHumor
   * @extends AntHill
   */
  var CollegeHumor = function CollegeHumor(containment, opts) {

    /**
     * Define containment
     * @property CollegeHumor
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property CollegeHumor
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
     * @property CollegeHumor
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

  return CollegeHumor.extend('CollegeHumor', {}, AntHill.prototype);
});
