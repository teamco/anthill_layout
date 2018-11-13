/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

import './bar.scss';

import {AntHill} from '../../core/config/anthill';
import {MVC} from '../../modules/MVC';
import {BarController} from './mvc/bar.controller';
import {BarModel} from './mvc/bar.model';
import {BarView} from './mvc/bar.view';
import {BarEventManager} from './mvc/bar.event.manager';
import {BarPermission} from './mvc/bar.permission';

/**
 * Define Bar
 * @class Bar
 * @extends AntHill
 */
export class Bar extends AntHill {

  /**
   * @constructor
   * @param {Panel} containment
   */
  constructor(containment) {
    super('Bar', null);

    /**
     * Define containment
     * @property Bar
     */
    this.containment = containment;

    /**
     * @constant DEFAULTS
     * @type {{
     *  plugin: boolean,
     *  html: {
     *    header: boolean,
     *    footer: boolean,
     *    padding: {top: number, right: number, bottom: number, left: number}
     *  }
     * }}
     */
    const DEFAULTS = {
      plugin: true,
      html: {
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
     * @property Bar
     * @type {MVC}
     */
    this.mvc = new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        BarController,
        BarModel,
        BarView,
        BarEventManager,
        BarPermission
      ],
      render: true
    });

    this.observer.publish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.defineModules);
    this.observer.publish(this.eventManager.eventList.updateTranslations, ['plugins/bar/translations/en-us']);
  }
}