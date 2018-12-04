/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

import './gallery.scss';

import {AntHill} from '../../core/config/anthill';
import {MVC} from '../../modules/MVC';
import {GalleryController} from './mvc/gallery.controller';
import {GalleryModel} from './mvc/gallery.model';
import {GalleryView} from './mvc/gallery.view';
import {GalleryEventManager} from './mvc/gallery.event.manager';
import {GalleryPermission} from './mvc/gallery.permission';

/**
 * @class Gallery
 * @extends AntHill
 */
export class Gallery extends AntHill {

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
     * Define defaults
     * @type {{
     *  icon: string,
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
      icon: 'wallet',
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
     * @type {MVC}
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
}