/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

import './page.data.css';
import '../preferences/preferences.css';

import {AntHill} from '../../core/config/anthill';
import {MVC} from '../../modules/MVC';
import {PageDataController} from './mvc/page.data.controller';
import {PageDataModel} from './mvc/page.data.model';
import {PageDataView} from './mvc/page.data.view';
import {PageDataEventManager} from './mvc/page.data.event.manager';
import {PageDataPermission} from './mvc/page.data.permission';

/**
 * @class PageData
 * @extends AntHill
 */
export class PageData extends AntHill {

  /**
   * @param containment
   * @constructor
   */
  constructor(containment) {
    super('PageData', null, true);

    /**
     * Define containment
     * @property PageData
     */
    this.containment = containment;

    /**
     * Define active content
     * @property PageData
     * @type {*}
     */
    this.activeContent = undefined;

    /**
     * Allow to locate element
     * @property PageData
     * @type {boolean}
     */
    this.allowToLocate = true;

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
      }
    };

    new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        PageDataController,
        PageDataModel,
        PageDataView,
        PageDataEventManager,
        PageDataPermission
      ],
      render: true
    });

    this.observer.batchPublish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.updateTranslations, ['plugins/page.data/translations/en-us']);

    this.utils.waitFor(
        () => Object.keys(this.controller.getPage()).length,
        () => {
          this.controller.subscribeRefreshContentAfterDestroyItems();
          this.controller.subscribeRefreshContentSwitchPage();
        },
        () => this.logger.warn('Timeout. Unable to subscribe to refresh content')
    );
  }
}