/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseElement} from '../../../modules/Element';

/**
 * Define content
 * @param {WidgetView} view
 * @param opts
 * @class WidgetExpanderElement
 * @constructor
 * @extends BaseElement
 */
export class WidgetExpanderElement extends BaseElement {

  /**
   * @constructor
   * @param view
   * @param opts
   * @returns {WidgetExpanderElement}
   */
  constructor(view, opts) {
    super('WidgetExpanderElement', view);
    if (view.controller.isExpandable()) {

      this._config(view, opts, $('<div />')).build({
        $container: opts.$container,
        destroy: true
      });

      this.toggleExpandText(true);
      this.bindExpander();
    }
  }

  /**
   * Define bind Expander
   * @memberOf WidgetExpanderElement
   */
  bindExpander() {

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.view.scope;

    this.$.on('click.expand', e => {
      scope.observer.publish(scope.eventManager.eventList.expandContent, e);
    });
  }

  /**
   * Define text toggle
   * @memberOf WidgetExpanderElement
   * @param {boolean} expand
   */
  toggleExpandText(expand) {
    this.setText(expand ?
        this.i18n.t('expand.widget') :
        this.i18n.t('collapse.widget')
    );
  }
}