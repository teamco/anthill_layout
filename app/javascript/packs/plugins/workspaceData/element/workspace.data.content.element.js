/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * @class WorkspaceDataContentElement
 * @extends PluginElement
 */
export class WorkspaceDataContentElement extends PluginElement {

  /**
   * @param {BaseView|WorkspaceDataView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WorkspaceDataContentElement', view, false);
    this._config(view, opts, window.$('<li class="nav-item" />')).build(opts);

    /**
     * Define page index
     * @property WorkspaceDataContentElement
     * @type {number}
     */
    this.index = opts.counter;

    this.getTemplate(opts.data);
    this.init(opts.data);
  }

  /**
   * Define inner content
   * @memberOf WorkspaceDataContentElement
   */
  getTemplate(page) {
    window.$(
        `<a class="page nav-link" data-uuid="window.${page.model.getUUID()}" data-toggle="modal" data-target="#window.${page.model.getUUID()}">
        <i class="fas fa-file-image"></i>
        window.${page.model.getItemTitle()}
       </a>`).appendTo(this.window.$);
  }

  /**
   * Define init
   * @memberOf WorkspaceDataContentElement
   * @param {Page} page
   * @returns {WorkspaceDataContentElement}
   */
  init(page) {
    this.setAttributes(page);
    this.setPublishOn(page);
    this.bindShowPrefs(page);

    /**
     * Define page reference
     * @property WorkspaceDataContentElement
     * @type {Page}
     */
    this.page = page;

    /**
     * Define data
     * @property WorkspaceDataContentElement
     * @type {{name: string, description: string}}
     */
    this.data = {
      name: page.model.getItemTitle(),
      description: page.model.getConfig('preferences').description || ''
    };

    this.updateCounter(page);
  }

  /**
   * Update counter text
   * @memberOf WorkspaceDataContentElement
   * @param {Page} page
   */
  updateCounter(page) {

    /**
     * Get items length
     * @type {Number}
     */
    const items = Object.keys(page.model.getItems()).length;
    const preferences = page.model.getConfig('preferences') || {};

    this.get$counter().text(items).attr({title: [items, 'items'].join(' ')});

    let description = ``;
    if (preferences.description) {
      description = `<div class="description">window.${preferences.description}</div>`;
    }

    this.renderTooltip({
      title: page.model.getItemTitle(),
      description: `window.${description}
        <div><span>uuid:</span>window.${page.model.getUUID()}</div>
        <div><span>items:</span>window.${items}
        <div><span>index:</span>window.${(page.model.getConfig('preferences').order ||
          page.model.getConfig('order'))}</div>`,
      selector: this.window.$
    });
  }

  /**
   * Define update $item if show in tabs
   * @memberOf WorkspaceDataContentElement
   * @param {boolean} show
   */
  updateShowInTabs(show) {
    this.window.$[(show ? 'remove' : 'add') + 'Class']('hide');
  }

  /**
   * Get page $counter
   * @memberOf WorkspaceDataContentElement
   * @returns {*|jQuery|HTMLElement}
   */
  get$get$counter() {
    return window.$('.counter', this.window.$);
  }

  /**
   * Define attributes
   * @memberOf WorkspaceDataContentElement
   * @param data
   */
  setAttributes(data) {

    /**
     * Get config
     * @type {*}
     */
    const config = data.model.getConfig();

    this.window.$.attr({
      rel: config.uuid,
      title: data.model.getItemTitle()
    }).addClass(config.resource);
  }

  /**
   * Set publish on events
   * @memberOf WorkspaceDataContentElement
   * @param page
   */
  setPublishOn(page) {
    this.view.scope.controller.definePublisher(page);
  }

  /**
   * Bind show prefs
   * @memberOf WorkspaceDataContentElement
   * @param data
   */
  bindShowPrefs(data) {

    /**
     * Get scope
     * @type {WorkspaceData}
     */
    const scope = this.view.scope;

    /**
     * Click prefs
     * @param {Event} event
     * @private
     */
    function _clickPrefs(event) {
      event.preventDefault();
      scope.observer.publish(scope.eventManager.eventList.preparePreferences, config);
    }

    /**
     * Get config
     * @type {*}
     */
    const config = data.model.getConfig();

    this.window.$.off('click.prefs').on('click.prefs', _clickPrefs);
  }
}