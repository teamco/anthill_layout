/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * @class WidgetRulesContentElement
 * @extends PluginElement
 */
export class WidgetRulesContentElement extends PluginElement {

  /**
   * @param {WidgetRulesView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WidgetRulesContentElement', view, false);
    this._config(view, opts, window.$('<li class="nav-item" />')).build(opts);

    this.getTemplate(opts.data);
    this.setAttributes(opts.data);
    this.bindShowRules(opts.data);
    this.bindLocate(opts.data);
  }

  /**
   * Define inner content
   * @memberOf WidgetRulesContentElement
   * @param {Widget} widget
   */
  getTemplate(widget) {
    const resource = widget.model.getConfig('preferences').resource.toClassName();
    const name = (widget.controller.getContent() || {}).name;
    window.$(`<a class="nav-link" data-uuid="${resource}" data-toggle="modal" data-target="#${resource}">
         <span class="widget ${resource}">${name}</span> 
       </a>`).appendTo(this.$);
  }

  /**
   * Define attributes
   * @memberOf WidgetRulesContentElement
   * @param {Widget} widget
   */
  setAttributes(widget) {

    /**
     * Get title
     * @type {boolean|string}
     */
    const title = widget.model.getItemTitle();

    /**
     * Get prefs
     * @type {{description: string, resource: string}}
     */
    const prefs = widget.model.getConfig('preferences');

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
      selector: this.$,
      customCss: `widget ${prefs.resource.toClassName()}`
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
}