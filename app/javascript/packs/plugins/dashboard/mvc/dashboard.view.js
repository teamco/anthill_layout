/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../../modules/View';
import {DashboardElement} from '../element/dashboard.element';

/**
 * @class DashboardView
 * @extends BaseView
 */
export class DashboardView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'DashboardView', scope);
  }

  /**
   * Render Dashboard
   * @memberOf DashboardView
   * @returns {boolean}
   */
  renderDashboard() {
    if (this.isCached('$dashboard', DashboardElement)) {
      return false;
    }

    /**
     * Define Dashboard element
     * @type {DashboardElement}
     */
    this.elements.$dashboard = new DashboardElement(this, {
      $container: this.get$container().$
    });
  }

  /**
   * Render empty content
   * @memberOf DashboardView
   * @returns {boolean}
   */
  renderContent() {
    return false;
  }

  /**
   * Render dashboard
   * @memberOf DashboardView
   */
  render() {
    this.scope.observer.publish(
        this.scope.eventManager.eventList.successRendered,
        this.renderDashboard.bind(this)
    );
  }
}