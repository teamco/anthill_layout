/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * @class MVC
 * @extends AntHill
 */
module.exports = class MVC extends AntHill {

  /**
   * @constructor
   * @param opts
   */
  constructor(opts) {
    super('MVC', opts.scope, false);

    /**
     * Define scope
     * @property MVC.scope
     * @type {{eventManager, config}}
     */
    this.scope = opts.scope || {};

    /**
     * Define MVC Relationship from -> to
     * @property MVC.RELATIONS
     * @type {Array}
     */
    this.RELATIONS = [
      ['Controller', 'Model'],
      ['View', 'Controller']
    ];

    /**
     * Define local defaults
     * @type {string[]}
     */
    const singular = [
          'Workspace',
          'Page',
          'Widget'
        ],
        plural = [
          'Workspaces',
          'Pages',
          'Widgets'
        ];

    /**
     * Define reserved methods
     * @property MVC.RESERVED
     * @type {{
     *  create: {singular: Array},
     *  destroy: {singular: Array, plural: Array}
     *  resize: {singular: Array, plural: Array}
     * }}
     */
    this.RESERVED = {
      resize: {
        singular: singular,
        plural: plural
      },
      create: {
        singular: singular
      },
      destroy: {
        singular: singular,
        plural: plural
      }
    };

    /**
     * Define default listeners
     * @property MVC.DEFAULT_LISTENERS
     * @type {{
     *  beforeInitConfig: string,
     *  afterInitConfig: string,
     *  successCreated: string,
     *  successRendered: string,
     *  afterCreateItem: string,
     *  afterDestroyItem: string,
     *  afterDestroyItems: string,
     *  afterResizeWindow: string,
     *  successRenderHeader: string,
     *  successRenderFooter: string,
     *  bindModelObserver: string,
     *  defineGenericGetter: string,
     *  openUrlOnEvent: string,
     *  successCreateElement: string,
     *  successBuildElement: string,
     *  successDestroyElement: string
     * }}
     */
    this.DEFAULT_LISTENERS = {
      beforeInitConfig: 'before.init.config',
      afterInitConfig: 'after.init.config',
      successCreated: 'success.created',
      successRendered: 'success.rendered',
      afterCreateItem: 'after.create.item',
      afterDestroyItem: 'after.destroy.item',
      afterDestroyItems: 'after.destroy.items',
      afterResizeWindow: 'after.resize.window',
      successRenderHeader: 'success.render.header',
      successRenderFooter: 'success.render.footer',
      bindModelObserver: 'bind.model.observer',
      defineGenericGetter: 'define.generic.getter',
      openUrlOnEvent: 'open.url.on.event',
      successCreateElement: 'success.create.element',
      successBuildElement: 'success.build.element',
      successDestroyElement: 'success.destroy.element'
    };

    /**
     * Reset opts
     * @type {*}
     */
    opts = opts || {};

    /**
     * Apply Configure
     * Define selfConfig
     * @type {*}
     */
    const selfConfig = opts.config[0] || {};

    /**
     * Define selfDefaults
     * @type {*}
     */
    const selfDefaults = opts.config[1] || {};

    /**
     * Define scope config
     * @property MVC.scope
     * @type {*}
     */
    this.scope.config = $.extend(true, {}, selfDefaults, selfConfig);

    /**
     * Define mvc components
     * @property MVC
     * @type {mvc.components}
     */
    this.components = opts.components || [];

    /**
     * Define mvc force creating components
     * @property MVC
     * @type {boolean}
     */
    this.force = !!opts.force;

    /**
     * Define mvc render
     * @property MVC
     * @type {boolean}
     */
    this.render = typeof opts.render === 'undefined' ? true : opts.render;

    /**
     * Define event manager
     * @property BaseEvent
     * @type {Object}
     */
    this.scope.eventManager = {};

    this.init();

    /**
     * Define local instance of eventList
     * @property BaseEvent.eventManager
     * @type {Object}
     */
    const eventList = this.scope.eventManager.eventList;

    if (eventList) {

      // Publish before InitConfig event
      this.scope.observer.publish(eventList.beforeInitConfig,
          ['Config before create', Object.assign({}, this.scope.config)]);

      // Publish after InitConfig event
      this.scope.observer.publish(eventList.afterInitConfig, ['Config after create', this.scope.config]);
    }
  }

  /**
   * Init MVC
   * @property MVC
   */
  init() {
    this.applyLogger();
    this.defineContainment();
    this.applyConfig();
    this.applyMVC();
    this.applyEventManager();
    this.applyPermissions();
  }

  /**
   * Define parent node
   * @memberOf MVC
   */
  defineContainment() {

    /**
     * @type {{containment, eventManager, config}}
     */
    const scope = this.scope,
        config = scope.config;

    if (config.containment) {

      /**
       * Define parent node
       * @property AntHill
       * @type {*}
       */
      scope.containment = config.containment;
      delete config.containment;
    }
  }

  /**
   * Define MVC
   * @memberOf MVC
   * @param {Function|String} mvcPattern
   * @param {boolean} [force]
   * @returns {*}
   */
  defineMVC(mvcPattern, force) {

    const scope = this.scope;
    let name = mvcPattern;

    if (mvcPattern) {

      /**
       * Define name space
       * @type {string}
       */
      name = mvcPattern.name.replace(scope.name, '');
      name = name.match(/[a-z]/g) ? name.toCamelCase() : name.toLowerCase();

      /**
       * Define pattern
       * @type {*}
       */
      scope[name] = new mvcPattern(null, scope);

    } else if (force) {

      /**
       * Define scope name
       * @type {string}
       */
      const scopeName = scope.name.toLowerCase();

      /**
       * Define function
       * @type {Function}
       */
      const fn = new Function(scopeName, [
            'return function ', mvcPattern,
        '(null,', scopeName, ') { this.scope = ', scopeName, '; };'
          ].join('')
      );

      scope[name.toLowerCase()] = new (new fn(scope))(scope);
    }

    return name;
  }

  /**
   * Set relation between MVC components
   * @memberOf MVC
   */
  setRelation() {
    const relations = this.RELATIONS,
        l = relations.length,
        scope = this.scope;
    let from, to;

    for (let i = 0; i < l; i += 1) {
      const relation = relations[i];
      from = relation[0].toLowerCase();
      to = relation[1].toLowerCase();
      if (scope[from] && scope[to]) {

        /**
         * Define relation
         * @property {BaseController|BaseModel|BaseView}
         */
        scope[from][to] = scope[to];
      }
    }
  }

  /**
   * Apply MVC
   * @memberOf MVC
   * @returns {boolean}
   */
  applyMVC() {
    const l = this.components.length;

    for (let i = 0; i < l; i += 1) {

      /**
       * Get mvc component
       * @type {*}
       */
      const mvc = this.components[i];

      if (!mvc) {
        this.scope.logger.warn('Undefined pattern', i, this.components);
        return false;
      }

      const pattern = this.defineMVC(mvc, this.force),
          ref = this.scope[pattern];

      /**
       * Define scope
       * @type {*}
       * @property {BaseController|BaseModel|BaseView}
       */
      ref.scope = this.scope;

      this.applyMVCShims(pattern);
    }

    this.setRelation();
  }

  /**
   * Apply MVC shims
   * @memberOf MVC
   * @param pattern
   */
  applyMVCShims(pattern) {

    // Get scope
    const scope = this.scope;

    if (pattern === 'view') {

      /**
       * Define elements
       * @property BaseView
       * @type {Object}
       */
      scope.view.elements = {};
    }

    if (!scope.controller) {
      scope.logger.warn('Undefined controller');
      return false;
    }

    if (pattern === 'model' && scope.controller.isWidgetContent()) {

      /**
       * Define preferences
       * @property BaseModel
       * @type {Object}
       */
      scope.model.preferences = scope.model.preferences || {};
    }
  }

  /**
   * Apply config
   * @memberOf MVC
   */
  applyConfig() {
    const scope = this.scope,
        timestamp = this.utils.ts.timestamp(this.scope.config.timestamp),
        config = scope.config;

    config.uuid = this.utils.gen.UUID(this.scope.config.uuid);
    config.timestamp = timestamp;

    if (this.render) {
      config.html = config.html || {};
      config.html.selector = scope.name.toDash();
    }
  }

  /**
   * Apply event manager
   * @memberOf MVC
   */
  applyEventManager() {

    const scope = this.scope,
        eventManager = scope.eventManager;

    if (!eventManager || !eventManager.eventList) {

      scope.logger.warn('Undefined Event manager');
      return false;
    }

    this.applyGlobalEvents();

    eventManager.scope = scope;
    eventManager.abstract = eventManager.abstract || {};

    const eventList = eventManager.eventList;

    for (let index in eventList) {

      if (eventList.hasOwnProperty(index)) {

        const event = eventList[index];
        const controller = scope.controller;

        if (controller) {
          let callback = controller[index];
          if (!callback) {
            let method = index.toPoint().split('.'),
                key = method[0];

            method.shift();
            method = ('.' + method.join('.')).toCamelCase();

            if (this.RESERVED.hasOwnProperty(key)) {

              const singular = this.RESERVED[key].singular;
              const plural = this.RESERVED[key].plural;

              if (singular && singular.indexOf(method) > -1) {
                eventManager.abstract[key + 'Item'] = index;
                callback = scope.controller[key + 'Item'];
              } else if (plural && plural.indexOf(method) > -1) {
                eventManager.abstract[key + 'Items'] = index;
                callback = scope.controller[key + 'Items'];
              } else {
                scope.logger.warn('Undefined Event Callback', [scope.controller, key + method]);
              }
            }
          }

          eventManager.subscribe({
            event: event,
            callback: callback
          }, true);
        } else {
          scope.logger.warn('Controller is not defined', event);
        }
      }
    }

    this.applyDefaultListeners();
    scope.logger.debug('Subscribe events', eventManager);
    this.applyListeners('local');
    this.applyListeners('global');
  }

  /**
   * Apply default listeners
   * @memberOf MVC
   */
  applyDefaultListeners() {

    /**
     * Local instance of default listeners
     * @type {*}
     */
    const listeners = this.DEFAULT_LISTENERS;
    const scope = this.scope;

    /**
     * @type {module.BaseController}
     */
    const controller = scope.controller;

    if (!controller) {
      scope.logger.warn('Controller is not defined yet');
      return false;
    }

    for (let index in listeners) {
      if (listeners.hasOwnProperty(index)) {
        scope.eventManager.subscribe({
          event: listeners[index],
          callback: controller[index]
        }, true);
      }
    }
  }

  /**
   * Apply global events
   * @memberOf MVC
   */
  applyGlobalEvents() {

    // Get scope
    const scope = this.scope,
        eventManager = scope.eventManager;

    if (scope.globalEvents) {

      for (let index in scope.globalEvents) {

        if (scope.globalEvents.hasOwnProperty(index)) {

          let event = scope.globalEvents[index];

          if (eventManager.eventList.hasOwnProperty(index)) {

            scope.logger.warn('Event already defined', index, event);

          } else {

            scope.logger.debug('Add event', index, event);
            eventManager.eventList[index] = event;
          }
        }
      }
    }
  }

  /**
   * Apply listeners
   * @memberOf MVC
   */
  applyListeners(type) {

    const scope = this.scope,
        listener = type + 'Listeners';

    /**
     * Define scope listener
     * @type {globalListeners|localListeners}
     */
    const scopeListener = scope[listener];

    if (typeof scopeListener === 'object') {

      for (let index in scopeListener) {

        if (scopeListener.hasOwnProperty(index)) {

          /**
           * Define local instance of an event
           * @type {*}
           */
          let event = scopeListener[index];

          scope.eventManager.subscribe({
            event: {
              name: event.name,
              params: event.params,
              scope: event.scope
            },
            callback: event.callback
          }, false);
        }
      }
    }

    scope.logger.debug('Apply ' + type + ' listeners', scope[listener]);
  }

  /**
   * Define permissions
   * @memberOf MVC
   * @returns {boolean}
   */
  applyPermissions() {

    if (!this.scope.config.hasOwnProperty('plugin')) {
      this._applyPermissions('local');
      this._applyPermissions('global');
    }

    /**
     * Get scope
     * @type {mvc.scope|{permission, controller, logger}}
     */
    const scope = this.scope;

    /**
     * Get permissions
     * @type {BasePermission|{capability, init}}
     */
    const permission = scope.permission;

    if (!permission) {
      scope.logger.warn('Undefined permissions');
      return false;
    }

    permission.init ?
        permission.init() :
        scope.logger.warn('No permissions config (Extend BasePermission)', permission);

    scope.logger.debug('Local permissions', permission);
  }

  /**
   * Apply global permissions
   * @memberOf MVC
   * @returns {*|boolean}
   */
  _applyPermissions(type) {

    const scope = this.scope;

    if (!scope.controller) {
      scope.logger.warn('Controller must be defined for using permissions', type);
      return false;
    }

    const mode = scope.controller.getMode(),
        permission = type + 'Permissions';

    /**
     * Define permission params
     * @type {globalPermissions|localPermissions}
     */
    const scopePermission = scope[permission];

    if (!mode) {
      scope.logger.warn('Undefined ' + type + ' mode');
      return false;
    }

    if (!scopePermission) {
      scope.logger.warn('Undefined ' + type + ' permission');
      scope.constructor.prototype[permission] = {};
    }

    // Define capability
    const capabilities = (scopePermission || {})[mode];

    if (!capabilities) {
      scope.logger.warn('Undefined ' + type + ' capabilities', mode);
      scope.constructor.prototype[permission][mode] = {};
    }

    scope.logger.debug('Apply ' + type + ' permissions', capabilities);

    if (!scope.config.permission) {
      scope.config.permission = {};
    }

    scope.config.permission = {...scope.config.permission, ...capabilities};
  }

  /**
   * Apply Logger
   * @memberOf MVC.applyLogger
   */
  applyLogger() {
    this.scope.logger.setConfig(this.scope.config.logger || {});
  }
};