/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../extends/aggregation.js');

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * @constant BehaviorCrud
 * @type {BehaviorCrud}
 */
const BehaviorCrud = require('../../controller/behavior/behavior.crud.js');

/**
 * @constant BehaviorWindowResize
 * @type {BehaviorWindowResize}
 */
const BehaviorWindowResize = require('../../controller/behavior/behavior.window.resize.js');

/**
 * Define Base Controller
 * @class BaseController
 * @extends AntHill
 * @extends BehaviorCrud
 * @extends BehaviorWindowResize
 */
module.exports = class BaseController extends aggregation(AntHill, BehaviorCrud, BehaviorWindowResize) {

  /**
   * Define Base Controller
   * @constructor BaseController
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'BaseController', scope, false);
  }

  /**
   * Before init config
   * @property BaseController
   */
  beforeInitConfig() {
    this.logger.debug('Before init config', arguments);
  }

  /**
   * After init config
   * @property BaseController
   */
  afterInitConfig() {
    this.logger.debug('After init config', arguments);
  }

  /**
   * Success Create Element
   * @property BaseController
   * @param {BaseElement} $element
   */
  successCreateElement($element) {
    this.logger.debug('Success build element', $element);
  }

  /**
   * Success Build Element
   * @property BaseController
   * @param {BaseElement} $element
   */
  successBuildElement($element) {
    this.logger.debug('Success build element', $element);
  }

  /**
   * Success Destroy Element
   * @property BaseController
   * @param {BaseElement|{name}} $element
   */
  successDestroyElement($element) {
    const comment = this.i18n.t('element.overwritten').replace(/\{0}/, $element.name);
    this.logger.debug(comment, $element);
  }

  /**
   * Get cache
   * @property BaseController
   * @param {string} [uuid]
   * @returns {*}
   */
  getCache(uuid) {

    /**
     * Get root
     * @type {module.Application}
     */
    const root = this.root();

    return uuid ? root.cache[uuid] : root.cache;
  }

  /**
   * Define environment getter
   * @property BaseController
   * @returns {string|environment|*}
   */
  getEnvironment() {
    return this.root().config.environment;
  }

  /**
   * Get cache
   * @property BaseController
   * @param {string} uuid
   * @param {*} value
   */
  updateCache(uuid, value) {
    this.root().cache[uuid] = value;
  }

  /**
   * Get cache css
   * @property BaseController
   * @param {string} path
   * @param {*} element
   */
  updateCacheCss(path, element) {

    // Get cache
    const cache = this.root().cache;

    cache.css = cache.css || {};
    cache.css[path] = element;
  }

  /**
   * Define routes setter
   * @property BaseController
   */
  setRoutes() {

    const routes = this.model.getConfig('routes') || {};

    for (let index in routes) {
      if (routes.hasOwnProperty(index)) {
        this.controller.setRoute(index, routes[index]);
      }
    }
  }

  /**
   * Bind model observer
   * @property BaseController
   */
  bindModelObserver() {
    this.logger.debug('Bind model observer', arguments);
    if (this.model) {
      this.model.bindModelObserver.apply(this, arguments);
    }
  }

  /**
   * After loading items
   * @property BaseController
   */
  afterLoadingItems() {
    this.logger.debug(
        'After loading items',
        this.model.getItems()
    );
    this.controller.setAsLoading(false);
  }

  /**
   * Set core loading attribute
   * @property BaseController
   * @param load
   */
  setAsLoading(load) {

    /**
     * Get root
     * @type {Application|{model, eventManager}}
     */
    const root = this.root();

    root.model.setConfig('loading', load);

    if (this.scope === root) {
      root.observer.publish(root.eventManager.eventList.setAsLoaded);
    }
  }

  /**
   * Set as loaded
   * @property BaseController
   */
  setAsLoaded() {

    this.logger.debug('Application was loaded');

    /**
     * Get item constructor name
     * @type {string}
     */
    const namespace = this.model.getItemNameSpace();

    /**
     * Get workspace
     * @type {WorkspaceController}
     */
    const wsc = this[namespace].controller;

    if (wsc) {
      wsc.switchPageOnHashChange();
    }
  }

  /**
   * Check if core already loaded
   * @property BaseController
   * @returns {boolean}
   */
  isLoading() {
    return this.root().model.getConfig('loading');
  }

  /**
   * Get Application mode
   * @property BaseController
   * @returns {*|number}
   */
  getMode() {
    return this.root().config.mode;
  }

  /**
   * Get parent node object
   * @property BaseController
   * @returns {*}
   */
  getContainment() {
    return this.scope.containment;
  }

  /**
   * Get Application Root
   * @property BaseController
   * @returns {*|string}
   */
  root() {

    /**
     * Define root instance
     * @type {*}
     */
    let root = this.scope;
    while (root.hasOwnProperty('containment')) {
      root = root.containment;
    }

    return root;
  }

  /**
   * Get Application name
   * @property BaseController
   * @returns {string}
   */
  getAppName() {
    return this.root().model.getConfig('appName');
  }

  /**
   * Get Workspace
   * @property BaseController
   * @param {string} [uuid]
   * @returns {Workspace}
   */
  getWorkspace(uuid) {

    /**
     * Get root
     * @type {Application|{model}}
     */
    const root = this.root();

    return uuid ? root.model.getItemByUUID(uuid) : root.model.getCurrentItem();
  }

  /**
   * Get Page
   * @property BaseController
   * @param {string} [uuid]
   * @returns {Page}
   */
  getPage(uuid) {

    /**
     * Define workspace
     * @type {Workspace|{model}}
     */
    const workspace = this.getWorkspace();

    return uuid ? workspace.model.getItemByUUID(uuid) : workspace.model.getCurrentItem();
  }

  /**
   * Get Widget
   * @property BaseController
   * @param {string} [uuid]
   * @returns {*|Widget}
   */
  getWidget(uuid) {

    /**
     * Get page
     * @type {Page|{model}}
     */
    const page = this.getPage();

    return uuid ? page.model.getItemByUUID(uuid) : page.model.getCurrentItem();
  }

  /**
   * Get Config Logger
   * @property BaseController
   * @param {string} log
   * @param {Object} hash
   */
  getConfigLog(log, hash) {
    this.logger.debug(log, hash);
  }

  /**
   * Get scope view
   * @property BaseController
   * @returns {view}
   */
  getView() {
    return this.scope.view;
  }

  /**
   * Get scope model
   * @property BaseController
   * @returns {model}
   */
  getModel() {
    return this.scope.model;
  }

  /**
   * Success Created
   * @property BaseController
   */
  successCreated() {
    this.logger.debug('Successfully created');
    this.observer.publish(this.eventManager.eventList.defineGenericGetter);
  }

  /**
   * Define instance getter
   * @property BaseController
   */
  defineGenericGetter() {

    const containment = this.controller.getContainment(),
        scope = this;

    if (!containment) {
      if (scope !== scope.controller.root()) {
        scope.logger.warn('Undefined containment');
      }
      return false;
    }

    /**
     * Get constructor prototype
     * @type {BaseController}
     */
    const controller = containment.controller.constructor.prototype;
    const fnName = 'get' + this.name;

    if (controller[fnName]) {
      scope.logger.debug('Getter already implemented', fnName);
    } else if (scope.config.getter) {

      /**
       * Define generated getter
       * @returns {*}
       */
      controller[fnName] = function genericGetter() {
        return scope;
      };

    } else {
      scope.logger.debug('Config getter was missing', scope);
    }
  }

  /**
   * Success Rendered
   * @property BaseController
   */
  successRendered() {
    const comment = this.i18n.t('success.rendered').replace(/\{0}/, this.name);
    this.logger.debug(comment);
  }

  /**
   * Success Render Footer
   * @property BaseController
   * @param {HeaderElement} $header
   * @param {boolean} render
   */
  successRenderHeader($header, render) {
    this.logger.debug('Success Render Header', render, $header);
  }

  /**
   * Success Render Footer
   * @property BaseController
   * @param {FooterElement} $footer
   * @param {boolean} render
   */
  successRenderFooter($footer, render) {
    this.logger.debug('Success Render Footer', render, $footer);
  }

  /**
   * Set item as current in parent node
   * @property BaseController
   */
  setAsCurrent() {
    this.getContainment().controller.setCurrentItem(this.scope);
  }

  /**
   * Set current item
   * @property BaseController
   * @param {{}} item
   * @returns {*}
   */
  setCurrentItem(item) {
    const scope = this.scope;
    scope[scope.model.getItemNameSpace()] = item;
    return this.model.getCurrentItem();
  }

  /**
   * Check condition
   * @property BaseController
   * @param {{condition, msg, [type], [args]}} opts
   * @returns {boolean}
   */
  checkCondition(opts) {

    opts = opts || {};

    /**
     * Define logger
     * @type {function}
     */
    const logger = this.scope.logger[opts.type || 'debug'];

    if (opts.condition) {
      opts.args ? logger(opts.msg, opts.args) : logger(opts.msg);
      return true;
    }
    return false;
  }

  /**
   * Get Development Mode
   * @property BaseController
   * @returns {Boolean}
   */
  isDevelopmentMode() {
    return this.getMode() === 'development';
  }

  /**
   * Get Authorize Mode
   * @property BaseController
   * @returns {Boolean}
   */
  isAuthorizeMode() {
    return this.getMode() === 'authorize';
  }

  /**
   * Get Consumption Mode
   * @property BaseController
   * @returns {boolean}
   */
  isConsumptionMode() {
    return this.getMode() === 'consumption';
  }

  /**
   * Get Custom Mode
   * @property BaseController
   * @returns {boolean}
   */
  isCustomMode() {
    return this.getMode() === 'custom';
  }

  /**
   * Get Custom publisher
   * @property BaseController
   * @returns {string|boolean}
   */
  getCustomPublisher(name) {

    // Get event
    const eventName = 'load' + name.capitalize(),
        event = this.scope.eventManager.eventList[eventName];

    if (!event) {
      this.scope.logger.debug('Undefined custom event', name, eventName);
      return false;
    }

    // Define custom event
    const publishCustomEvent = event ? [
      'this.scope.logger.debug(\'Publish custom event\',"' + event + '");',
      'this.scope.observer.publish("' + event + '");'
    ].join('') : '';

    this.scope.logger.debug('Found custom publisher', publishCustomEvent, event);
    return publishCustomEvent;
  }

  /**
   * Load config preferences
   * @property WorkspaceController
   */
  loadPreferences() {

    // Get scope
    const scope = this;

    /**
     * Get preferences
     * @type {{}}
     */
    const prefs = scope.model.getConfig('preferences');

    $.each(prefs, (index, value) => {

      /**
       * Define method name
       * @type {string}
       */
      const setter = 'set' + index.toCamelCase().capitalize();

      if (typeof(scope.model[setter]) !== 'function') {

        /**
         * Define setter
         * @type {Function}
         */
        const fn = scope.base.lib.function.create({
          name: setter,
          params: index,
          body: 'this._setItemInfoPreferences("' + index + '", ' + index + ');' +
          scope.controller.getCustomPublisher(index),
          scope: scope.model.constructor.prototype
        });

        scope.logger.debug('Define model setter', fn, index, setter);
      }

      scope.model[setter](value);
    });
  }

  /**
   * After update preferences
   * @property BaseController
   */
  afterUpdatePreferences() {
    this.logger.debug('After update preferences', arguments);
  }

  /**
   * Transfer preferences to containment
   * @property BaseController
   * @param index
   * @param value
   */
  transferPreferences(index, value) {

    const widgetContent = this.controller.isWidgetContent(),
        skipTransfer = this.model.checkSkipPreferencesOn(index);

    if (widgetContent || skipTransfer) {
      return false;
    }

    this.config.preferences[index] = value;
  }

  /**
   * Get preferences
   * @property BaseController
   * @returns {{}}
   */
  getPreferences() {
    return this.model.preferences;
  }

  /**
   * Get rules
   * @property BaseController
   * @returns {{}}
   */
  getRules() {
    return this.model.rules;
  }

  /**
   * Open url in new window or in dialog
   * @property BaseController
   * @param {string} url
   * @param {boolean} selfWindow
   * @param {boolean} isDialog
   */
  openUrlOnEvent(url, selfWindow, isDialog) {

    // Workaround to multiple clicks
    this.openUrlEventHandler += 1;

    if (this.openUrlEventHandler > 1) {

      // Reset event handler
      this.openUrlEventHandler = 0;
      return false;
    }

    if (isDialog) {
      // TODO
      this.logger.debug('Open url in dialog', url);
      return false;
    }

    this.logger.debug('Open url in new window', url);

    if (selfWindow) {

      window.location.href = url;

    } else {

      /**
       * Define opened window instance
       * @property AntHill
       * @type {Window}
       */
      this.openedWindow = window.open(url);
    }
  }

  /**
   * Update site description
   * @property BaseController
   */
  updateSiteDescription() {

    /**
     * Get $item
     * @type {BaseElement}
     */
    const $item = this.controller.root().view.get$item();
    const siteDescription = this.model.getConfig('preferences')['siteDescription'] || $item.getSiteDescription();
    $item.setSiteDescription(siteDescription);
  }

  /**
   * Update site keywords
   * @property BaseController
   */
  updateSiteKeywords() {

    /**
     * Get $item
     * @type {BaseElement}
     */
    const $item = this.controller.root().view.get$item();
    const siteKeywords = this.model.getConfig('preferences')['siteKeywords'] || $item.getSiteKeywords();
    $item.setSiteKeywords(siteKeywords);
  }

  /**
   * Extend Config
   * @property BaseController
   * @param {{config, [dom]}} opts
   * @returns {*}
   */
  extendConfig(opts) {
    const scope = this.scope;
    const config = {
      html: {
        container: [
          '#', scope.model.getUUID(),
          '-', scope.model.getScopeName().toLowerCase()
        ].join('')
      },
      containment: scope
    };

    opts.config = $.extend(true, opts.config || {}, config);
    scope.logger.debug('Configuration', opts.config);

    return opts;
  }

  /**
   * Check is root
   * @property BaseController
   * @param [scope]
   * @returns {boolean}
   */
  isRoot(scope) {
    return (scope || this.scope) === this.root();
  }

  /**
   * Check is workspace
   * @property BaseController
   * @returns {boolean}
   */
  isWorkspace() {
    return this.scope.model.getScopeName() === 'Workspace';
  }

  /**
   * Check is page
   * @property BaseController
   * @returns {boolean}
   */
  isPage() {
    return this.scope.model.getScopeName() === 'Page';
  }

  /**
   * Check is widget
   * @property BaseController
   * @param {Widget} [item]
   * @returns {boolean}
   */
  isWidget(item) {
    const model = (item || this.scope).model;
    return model ? model.getScopeName() === 'Widget' : false;
  }

  /**
   * Check if item is a core component
   * @property BaseController
   * @returns {*|boolean}
   */
  isCoreComponent() {
    return this.isWidget() || this.isPage() || this.isWorkspace() || this.isRoot();
  }

  /**
   * Check is widget content
   * @property BaseController
   * @returns {boolean}
   */
  isWidgetContent() {

    // Get scope
    const scope = this.scope;

    /**
     * Get widget
     * @type {Widget|{controller}}
     */
    const widget = scope.controller.getContainment();

    if (widget) {
      scope.logger.debug('Widget has content');
      return widget.controller.isWidget();
    }

    scope.logger.info('Root is not widget content');
    return false;
  }

  /**
   * Store data after layout organize
   * @property BaseController
   * @param [node]
   * @param [data]
   * @param {number} [counter]
   */
  store(node, data, counter) {

    /**
     * Get scope
     * @type {{permission, logger}}
     */
    const scope = this.scope;

    if (!scope.permission.getCapability(this.store.name)) {
      scope.logger[this.isConsumptionMode() ? 'debug' : 'warn']('Unable to save layout', arguments);
      return false;
    }

    /**
     * Define root
     * @type {module.Application}
     */
    const root = this.root();

    /**
     * Define node
     * @type {*}
     */
    node = node || root;

    /**
     * Define data
     * @type {*}
     */
    data = data || {collector: {}};

    /**
     * Define item list
     * @type {*}
     */
    const items = node.model.getItems();

    /**
     * Define item name space
     * @type {string}
     */
    const cname = node.model.getItemNameSpace();

    if (node[cname].model) {

      /**
       * Define data
       * @type {*}
       */
      data.collector[cname] = data.collector[cname] || {};

      Object.assign(
          data.collector[cname],
          node.controller.collectItemProperties(!node[cname].model.getItems())
      );
    }

    for (let index in items) {
      if (items.hasOwnProperty(index)) {
        const item = items[index];
        if (item.model && item.model.getItems()) {
          this.store.bind(node.controller)(item, data, Object.keys(items).length);
        }
      }
    }

    if (!counter) {
      root.model.setting.save(data);
    }
  }

  /**
   * Get subscribers list
   * @property BaseController
   * @param {string} event
   * @return {Array}
   */
  getSubscribers(event) {

    /**
     * Define rules
     * @type {{}}
     */
    const rules = this.model.rules || {};
    return rules.subscribers ? rules.subscribers[event] : [];
  }

  /**
   * Collect items data
   * @property BaseController
   * @param {Boolean} collectDOM
   * @returns {{}}
   */
  collectItemProperties(collectDOM) {

    const collector = {},
        items = this.model.getItems();

    if (!items) {
      this.scope.logger.warn('Model with no items');
      return collector;
    }

    for (let index in items) {
      if (items.hasOwnProperty(index)) {

        const item = items[index],
            uuid = item.model.getConfig('uuid');

        collector[uuid] = {};

        /**
         * Define config
         * @type {{}}
         */
        collector[uuid].config = Object.assign(item.model.getConfig(), collector[uuid].config);

        /**
         * Define containment
         * @type {string}
         */
        collector[uuid].containment = item.containment.model.getConfig('uuid');

        if (collectDOM) {

          /**
           * Collect DOM
           * @type {{}}
           */
          collector[uuid].dom = item.dom;
        }
      }
    }

    return collector;
  }
};