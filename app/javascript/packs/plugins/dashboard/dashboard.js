/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

import {MVC} from '../../modules/MVC';
import {AntHill} from '../../core/config/anthill';
import {DashboardController} from './mvc/dashboard.controller';
import {DashboardModel} from './mvc/dashboard.model';
import {DashboardEventManager} from './mvc/dashboard.event.manager';
import {DashboardPermission} from './mvc/dashboard.permission';
import {DashboardView} from './mvc/dashboard.view';

/**
 * @class Dashboard
 * @extends AntHill
 */
export class Dashboard extends AntHill {

  /**
   * @constructor
   * @param containment
   */
  constructor(containment) {
    super('Dashboard', null);

    /**
     * Define containment
     * @property Dashboard
     */
    this.containment = containment;

    /**
     * @constant
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
      icon: 'desktop',
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

    /**
     * Define MVC
     * @property Dashboard
     * @type {MVC}
     */
    new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        DashboardController,
        DashboardModel,
        DashboardView,
        DashboardEventManager,
        DashboardPermission
      ],
      render: true
    });

    this.observer.publish(this.eventManager.eventList.successCreated);

    this.observer.publish(
        this.eventManager.eventList.updateTranslations,
        ['plugins/dashboard/translations/en-us']
    );
  }
}