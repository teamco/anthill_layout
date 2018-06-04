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
 * @class WorkspaceDataContentElement
 * @extends PluginElement
 */
module.exports = class WorkspaceDataContentElement extends PluginElement {

  /**
   * @param {module.WorkspaceDataView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WorkspaceDataContentElement', view, false);
    this._config(view, opts, $('<li />')).build(opts);

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
    $('<a class="page" data-uuid="' + page.model.getUUID() + '" />').appendTo(this.$);
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
    this.renderCounter(page);

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
  }

  /**
   * Render page widgets counter
   * @memberOf WorkspaceDataContentElement
   * @param {Page} page
   */
  renderCounter(page) {
    this.$.append($('<div />').addClass('counter'));
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

    this.renderTooltip({
      title: page.model.getItemTitle(),
      description: [
        preferences.description || '', '<br />',
        '<span>uuid: </span>', page.model.getUUID(), '<br /><br />',
        '<span>items: </span>', items, '<br />',
        '<span>index: </span>', (
            page.model.getConfig('preferences').order ||
            page.model.getConfig('order'))
      ].join(''),
      selector: this.$
    });
  }

  /**
   * Define update $item if show in tabs
   * @memberOf WorkspaceDataContentElement
   * @param {boolean} show
   */
  updateShowInTabs(show) {
    this.$[(show ? 'remove' : 'add') + 'Class']('hide');
  }

  /**
   * Get page $counter
   * @memberOf WorkspaceDataContentElement
   * @returns {*|jQuery|HTMLElement}
   */
  get$get$counter() {
    return $('.counter', this.$);
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

    this.$.attr({
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

    this.$.off('click.prefs').on('click.prefs', _clickPrefs);
  }
};