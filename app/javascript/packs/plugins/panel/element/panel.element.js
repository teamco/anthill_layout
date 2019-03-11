/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';
import {LibCss} from '../../../modules/base/Css';

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
    this._config(view, opts, PanelElement.getTemplate()).build(opts);
    this.togglePanel();
    this.toggleMinimizePanel();
  }

  /**
   * Define template
   * @memberOf PanelElement
   * @static
   * @returns {string}
   */
  static getTemplate() {
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
   * @static
   * @param module
   */
  static showActiveModule(module) {
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

  /**
   * @method togglePanel
   * @memberOf PanelElement
   */
  togglePanel() {
    const css = 'sidebar-lg-show';
    this.view.scope.utils.event.on(document, 'click', `button[data-toggle='${css}']`, () =>
        document.querySelector('body').classList.toggle(css));
  }

  /**
   * @method toggleMinimizePanel
   * @memberOf PanelElement
   */
  toggleMinimizePanel() {
    const trigger = 'minimizer';
    const target = 'minimized';
    const css = 'sidebar-{0} brand-{0}';

    /**
     * @constant
     * @type {Base}
     */
    const utils = this.view.scope.utils;
    utils.event.on(document, 'click', `button[class='${css.replace(/\{0}/g, trigger)}']`, () => {
      const body = document.querySelector('body');
      LibCss.toggle(body, css.replace(/\{0}/g, target));
    });
  }
}