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

    /**
     * Fetch panel header
     * @property PanelElement
     */
    this.header = this.view.scope.model.getConfig('header');
    this.setPanelHeader();
  }

  /**
   * Define template
   * @memberOf PanelElement
   * @returns {string}
   */
  getTemplate() {
    return `<div class="sidebar"></div>`;
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
   * Define header wrapper
   * @memberOf PanelElement
   */
  setPanelHeader() {
    const $tpl = $('<li class="nav-header" />'),
        header = this.header;

    if (header && this.view.utils.setBoolean(header.visible, true)) {
      $tpl.appendTo(this.$.find('ul:first'));
      this.setLongHeader();
      this.setShortHeader();
      this.$.removeClass('no-title');
    } else {
      this.$.addClass('no-title');
    }
  }

  /**
   * Define long header wrapper
   * @memberOf PanelElement
   */
  setLongHeader() {

    const $tpl = $('<div class="profile-element text-center"><h1 class="logo-element"></h1></div>'),
        title = this.header.title;

    if (title && title.long) {
      $tpl.find('.logo-element').text(title.long);
      $tpl.appendTo(this.$.find('.nav-header'));
    }
  }

  /**
   * Define short header wrapper
   * @memberOf PanelElement
   */
  setShortHeader() {

    const $tpl = $('<div class="logo-element" />'),
        title = this.header.title;

    if (title && title.short) {
      $tpl.find('.logo-element').text(title.short);
      $tpl.appendTo(this.$.find('.nav-header'));
    }
  }

  /**
   * Hide Active module
   * @memberOf PanelElement
   */
  hideActiveModule() {
    this.view.elements.items[this.getContentItemIndex()].hide();
  }

  /**
   * Show Active module
   * @memberOf PanelElement
   */
  showActiveModule() {
    this.view.elements.items[this.getContentItemIndex()].show();
  }

  /**
   * Get item index
   * @memberOf PanelElement
   * @returns {string}
   */
  getContentItemIndex() {
    return ['$', this.view.controller.getActiveResource(), '-content'].join('');
  }
};