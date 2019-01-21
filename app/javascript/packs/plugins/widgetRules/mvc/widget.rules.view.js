/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../../modules/View';
import {WidgetRulesContentElement} from '../element/widget.rules.content.element';

/**
 * @class WidgetRulesView
 * @type {WidgetRulesView}
 */
export class WidgetRulesView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {WidgetRules} scope
   */
  constructor(name, scope) {
    super(name || 'WidgetRulesView', scope);
  }

  /**
   * Render WidgetRules
   * @memberOf WidgetRulesView
   * @returns {boolean}
   */
  renderWidgetRules() {

    /**
     * Define WidgetRules element
     * @type {PanelContentElement|BaseElement}
     */
    this.elements.$widgetrules = this.get$container();
  }

  /**
   * Render widget.rules content
   * @memberOf WidgetRulesView
   * @param data
   * @returns {boolean}
   */
  renderContent(data) {
    if (!this.elements.$filter) {
      this.cleanElementItems();
      this.renderFilterElement();
    }
    this.destroyElementItems();

    for (let index in data) {
      if (data.hasOwnProperty(index)) {

        /**
         * Render item
         * @type {WidgetRulesContentElement}
         */
        const $item = new WidgetRulesContentElement(this, {
          style: 'content',
          uuid: [data[index].model.getConfig('uuid'), this.scope.name.toDash()].join('-'),
          $container: this.get$item().$,
          data: data[index],
          destroy: false
        });

        this.scope.observer.publish(this.scope.eventManager.eventList.storeItem, data[index]);
        this.controller.defineContentReferrer(data[index]);
        this.updateElementItems($item);
      }
    }

    this.elements.$filter.updateData({
      items: this.elements.items,
      focusOn: 'input'
    });
  }

  /**
   * Show rules
   * @memberOf WidgetRulesView
   * @param config
   * @param load
   * @returns {boolean|*}
   */
  showWidgetRulesModal(config, load) {
    if (!load) {
      return false;
    }

    /**
     * Define scope
     * @type {WidgetRules|{name}}
     */
    const scope = this.scope;

    /**
     * Define $html
     * @type {PluginElement}
     */
    const $html = this.controller.getRulesHtml(config.uuid, load);

    if (!$html) {
      scope.logger.warn('Wait for loading rules');
      return false;
    }

    const activeContent = this.scope.activeContent;
    const $rules = activeContent.view.elements.$rules;
    const uuid = `${config.uuid}-${this.scope.name.toDash()}`;

    $rules.openRules.call(this.elements.items[uuid], {
      config: config,
      $html: $html.$,
      style: `${config.preferences.resource} widget-rules rules`,
      title: 'Widget rules',
      buttons: {
        preferences: {
          text: 'Preferences',
          type: 'info',
          events: {
            click: `preferences${scope.name}`
          }
        }
      }
    });
  }

  /**
   * Render widget.rules
   * @memberOf WidgetRulesView
   */
  render() {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, this.renderWidgetRules.bind(this));
  }
}