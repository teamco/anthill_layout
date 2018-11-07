/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

import {BaseAPI} from '../../modules/API';
import {Widget} from '../config/widget';

/**
 * Define Page API
 * @class PageAPI
 * @extends BaseAPI
 * @type {PageAPI}
 */
export class PageAPI extends BaseAPI {

  /**
   * @param {Page} scope
   * @param {string} name
   * @constructor
   */
  constructor(name, scope) {
    super('PageAPI', scope);
  }

  /**
   * Create Widget API
   * @memberOf PageAPI
   * @param {*} args
   * @param {Boolean} [render]
   * @param {Boolean} [silent]
   * @returns {*}
   */
  createWidget(args, render, silent) {

    /**
     * @type {Page}
     */
    const scope = this.scope;

    if (silent) {
      scope.controller.allowAddWidget();
    }

    if (!scope.controller.isAllowAddWidget()) {
      scope.logger.warn(scope.i18n.t('not.allowed.add.widget'), arguments);
      return false;
    }

    scope.layout.observer.publish(scope.layout.eventManager.eventList.beforeNestedOrganizer, silent);
    return scope.controller.updateWidgetsConfig(this._createItem(Widget, args, render, silent));
  }

  /**
   * Destroy widget
   * @memberOf PageAPI
   * @param {Widget} widget
   * @param {Boolean} [silent]
   */
  destroyWidget(widget, silent) {

    /**
     * @type {Page}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.destroyWidget, [widget, silent]);
  }

  /**
   * Destroy widgets
   * @memberOf PageAPI
   * @param {[Widget]} [items]
   * @param {Boolean} [silent]
   */
  destroyWidgets(items, silent) {

    /**
     * @type {Page}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.destroyWidgets, [items, silent]);
  }
}