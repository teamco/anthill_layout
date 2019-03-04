/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * Define Panel Element
 * @class PanelElement
 * @extends PluginElement
 */
export class PanelElement extends PluginElement {

  /**
   * @param {PanelView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PanelElement', view, false);
    this._config(view, opts, $(this.getTemplate())).build(opts);
  }

  /**
   * Define template
   * @memberOf PanelElement
   * @returns {string}
   */
  getTemplate() {
    return `<div class="sidebar" />`;
  }

  /**
   * Toggle open/close
   * @param {string} resource
   * @memberOf PanelElement
   * @returns {boolean}
   */
  toggleModule(resource) {

    // Define locals
    const scope = this.view.scope;
    scope.observer.publish(scope.eventManager.eventList.showContent, resource);
  }

  /**
   * Hide Active module
   * @memberOf PanelElement
   */
  hideActiveModule() {
  }

  /**
   * Show Active module
   * @memberOf PanelElement
   * @param module
   */
  showActiveModule(module) {
    module.view.get$item().$.parent().addClass('open');
  }

  /**
   * Get item index
   * @memberOf PanelElement
   * @returns {string}
   */
  getContentItemIndex() {
    return `$${this.view.controller.getActiveResource()}-content`;
  }

  /**
   * @method renderMinimizer
   * @memberOf PanelElement
   */
  renderMinimizer() {
    const template = `<button class="sidebar-minimizer brand-minimizer" type="button" />`;
    this.$.append(template);
  }
}