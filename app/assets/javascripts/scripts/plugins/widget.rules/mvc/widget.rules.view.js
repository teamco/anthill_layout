/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseView
 * @type {BaseView}
 */
const BaseView = require('../../../core/lib/modules/View.js');

/**
 * @class WidgetRulesView
 * @type {module.WidgetRulesView}
 */
module.exports = class WidgetRulesView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {WidgetRules} scope
   */
  constructor(name, scope) {
    super(name || 'WidgetRulesView', scope, false);
  }

  /**
   * Render WidgetRules
   * @memberOf WidgetRulesView
   * @returns {boolean}
   */
  renderWidgetRules() {

    /**
     * @constant WidgetRulesElement
     * @type {module.WidgetRulesElement|*}
     */
    const WidgetRulesElement = require('../element/widget.rules.element.js');

    if (!this.isCached('$widgetrules', WidgetRulesElement)) {

      /**
       * Define WidgetRules element
       * @type {module.WidgetRulesElement}
       */
      this.elements.$widgetrules = new WidgetRulesElement(this, {
        id: this.createUUID(),
        $container: this.get$container().$
      });
    }
  }

  /**
   * Render widget.rules content
   * @memberOf WidgetRulesView
   * @param data
   * @returns {boolean}
   */
  renderContent(data) {
    this.cleanElementItems();
    this.renderFilter(this.updateFooterContent.bind(this));

    /**
     * @constant WidgetRulesContentElement
     * @type {module.WidgetRulesContentElement|*}
     */
    const WidgetRulesContentElement = require('../element/widget.rules.content.element.js');

    for (let index in data) {
      if (data.hasOwnProperty(index)) {

        /**
         * Render item
         * @type {module.WidgetRulesContentElement}
         */
        const $item = new WidgetRulesContentElement(this, {
          style: 'content',
          uuid: [data[index].model.getConfig('uuid'), this.scope.name.toDash()].join('-'),
          $container: this.get$item().$,
          data: data[index]
        });

        this.scope.observer.publish(this.scope.eventManager.eventList.storeItem, data[index]);
        this.controller.defineContentReferrer(data[index]);
        this.updateElementItems($item);
      }
    }

    this.updateScrollCover();
    this.elements.$filter.updateData({items: this.elements.items, focusOn: 'input'});
    this.updateFooterContent();
  }

  /**
   * Update footer content
   * @memberOf WidgetRulesView
   */
  updateFooterContent() {
    this.renderFooter(this.get$item());
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

    this.openRules({
      config: config,
      $html: $html.$,
      style: [config.preferences.resource, 'widget-rules rules'].join(' '),
      title: 'Widget rules',
      buttons: {
        preferences: {
          text: 'Preferences',
          type: 'info',
          events: {
            click: 'preferences' + scope.name
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
};