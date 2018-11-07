/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../core/config/anthill.js');

/**
 * @class Gallery
 * @extends AntHill
 */
module.exports = class Gallery extends AntHill {

  /**
   * @constructor
   * @param {Panel} containment
   */
  constructor(containment) {
    super('Gallery', null);

    /**
     * Define containment
     * @property Gallery
     */
    this.containment = containment;

    /**
     * @constant GalleryController
     * @type {module.GalleryController|*}
     */
    const GalleryController = require('./mvc/gallery.controller.js');

    /**
     * @constant GalleryModel
     * @type {module.GalleryModel|*}
     */
    const GalleryModel = require('./mvc/gallery.model.js');

    /**
     * @constant GalleryView
     * @type {module.GalleryView|*}
     */
    const GalleryView = require('./mvc/gallery.view.js');

    /**
     * @constant GalleryEventManager
     * @type {module.GalleryEventManager|*}
     */
    const GalleryEventManager = require('./mvc/gallery.event.manager.js');

    /**
     * @constant GalleryPermission
     * @type {module.GalleryPermission|*}
     */
    const GalleryPermission = require('./mvc/gallery.permission.js');
    
    /**
     * @constant MVC
     * @type {module.MVC}
     */
    const MVC = require('../../core/lib/modules/MVC.js');

    /**
     * Define defaults
     * @type {{
     *  plugin: boolean,
     *  getter: boolean,
     *  html: {
     *    style: string,
     *    header: boolean,
     *    footer: boolean,
     *    floating: boolean,
     *    padding: {top: number, right: number, bottom: number, left: number}
     *  }
     * }}
     */
    const DEFAULTS = {
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
      },
      routes: {
        showWidgetsList: ['/author/site_storages/{0}/widgets.json', 'get']
      }
    };

    /**
     * Define MVC
     * @property Gallery
     * @type {module.MVC}
     */
    new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        GalleryController,
        GalleryModel,
        GalleryView,
        GalleryEventManager,
        GalleryPermission
      ],
      render: true
    });

    this.observer.batchPublish(
        this.eventManager.eventList.successCreated,
        this.eventManager.eventList.setRoutes,
        this.eventManager.eventList.initModel
    );

    this.observer.publish(this.eventManager.eventList.updateTranslations, ['plugins/gallery/translations/en-us']);
  }
};