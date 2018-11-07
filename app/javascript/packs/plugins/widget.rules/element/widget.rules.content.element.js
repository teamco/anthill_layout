/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

/**
 * @constant PluginElement
 * @type {module.PluginElement}
 */
const PluginElement = require('../../plugin.element.js');

/**
 * @class WidgetRulesContentElement
 * @extends PluginElement
 */
module.exports = class WidgetRulesContentElement extends PluginElement {

  /**
   * @param {WidgetRulesView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WidgetRulesContentElement', view, false);
    this._config(view, opts, $('<li />')).build(opts);

    this.getTemplate(opts.data);
    this.setAttributes(opts.data);
    this.bindShowRules(opts.data);
    this.bindLocate(opts.data);
  }

  /**
   * Define inner content
   * @memberOf WidgetRulesContentElement
   */
  getTemplate(data) {
    $('<a class="widget ' + data.model.getConfig('preferences').resource.toClassName() + '" />').appendTo(this.$);
  }

  /**
   * Define attributes
   * @memberOf WidgetRulesContentElement
   * @param data
   */
  setAttributes(data) {

    /**
     * Get title
     * @type {boolean|string}
     */
    const title = data.model.getItemTitle();

    /**
     * Get prefs
     * @type {{description: string, resource: string}}
     */
    const prefs = data.model.getConfig('preferences');

    /**
     * Get description
     * @type {string}
     */
    const description = prefs.description || '';

    /**
     * Define data
     * @memberOf WidgetRulesContentElement
     * @type {{name: string, description: string}}
     */
    this.data = {
      name: title,
      description: description
    };

    this.$.attr({title: title}).addClass(this.view.controller.getResourceClassName(prefs.resource));

    this.renderTooltip({
      title: title,
      description: description,
      selector: this.$
    });
  }

  /**
   * Bind show rules
   * @memberOf WidgetRulesContentElement
   * @param data
   */
  bindShowRules(data) {

    /**
     * Get scope
     * @type {WidgetRules}
     */
    const scope = this.view.scope;

    this.bindShowModalData(data, () => scope.controller.loadStoredRules(data.model.getConfig().rules));
  }
};