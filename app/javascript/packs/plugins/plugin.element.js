/**
 * @constant BaseElement
 * @type {BaseElement|*}
 */
const BaseElement = require('../core/lib/modules/Element.js');

/**
 * Define Plugin element
 * @extends BaseElement
 * @class PluginElement
 * @type {module.PluginElement}
 * @constructor
 */
module.exports = class PluginElement extends BaseElement {

  /**
   * @param {string} name
   * @param {BaseView} view
   * @param opts
   * @constructor
   */
  constructor(name, view, opts) {
    super(name || 'PluginElement', view, false);
  }

  /**
   * Bind show modal data
   * @memberOf PluginElement
   * @param {Widget} widget
   * @param {function} [callback]
   */
  bindShowModalData(widget, callback) {

    /**
     * Click on
     * @param {Event} event
     * @private
     */
    function _clickOn(event) {
      event.preventDefault();
      scope.observer.publish(scope.eventManager.eventList.prepareActiveComponent, [config, true, event, callback]);
    }

    /**
     * Get config
     * @type {*}
     */
    const config = widget.model.getConfig();

    // Get scope
    const scope = this.view.scope,
        clickOn = 'click.' + scope.name.toLowerCase();

    this.$.off(clickOn).on(clickOn, _clickOn);
    $('.popover').remove();
  }

  /**
   * Define trigger click Show Modal Data
   * @memberOf PluginElement
   */
  triggerShowModalData() {

    // Get scope
    const scope = this.view.scope,
        clickOn = 'click.' + scope.name.toLowerCase();

    this.$.trigger(clickOn);
  }

  /**
   * Locate widget before
   * @memberOf PluginElement
   * @param data
   */
  bindLocate(data) {

    /**
     * Define scope
     * @type {WidgetRules}
     */
    const scope = this.view.scope;

    // Get location event
    const locateOn = 'mouseenter.rules mouseleave.rules';

    this.$.off(locateOn).on(locateOn,
        scope.controller.locateElementItem.bind({
          scope: scope,
          uuid: data.model.getUUID()
        })
    );
  }

  /**
   * Fetch External Resource Thumbnail
   * @memberOf PluginElement
   * @param {{is_external: boolean, external_resource: string, resource: string}} item
   * @returns {string}
   */
  fetchExternalResourceThumbnail(item) {

    let thumbnail = item.is_external ?
        item.external_resource :
        '/assets/scripts/plugins/stylesheets/';

    thumbnail += 'images/' + item.resource + '.png';
    return thumbnail;
  }

  /**
   * Get page $counter
   * @memberOf PluginElement
   * @returns {*|jQuery|HTMLElement}
   */
  get$counter() {
    return $('.counter', this.$);
  }

  /**
   * Get footer html
   * @memberOf PluginElement
   * @returns {*|jQuery}
   */
  getFooter() {
    const counter = Object.keys(this.view.elements.items || {}).length.toString(),
        $template = '<p class="text-center"><span class="badge" title="{0}">{0}</span>{1}</p>';

    return $template.replace(/\{0}/g, counter).replace(/\{1}/g, this.view.scope.i18n.t('panel.items'));
  }
};
