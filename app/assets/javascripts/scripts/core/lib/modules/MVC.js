/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant AntHill
 * @type {AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * @class MVC
 * @param opts
 * @constructor
 * @extends AntHill
 */
module.exports = class MVC extends AntHill {

  constructor(opts) {

    super('MVC', opts.scope);

    /**
     * Define scope
     * @property MVC.scope
     * @type {{eventmanager, config}}
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
     *      create: {singular: Array},
     *      destroy: {singular: Array, plural: Array}
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
     *      beforeInitConfig: string,
     *      afterInitConfig: string,
     *      successCreated: string,
     *      successRendered: string,
     *      afterCreateItem: string,
     *      afterDestroyItem: string,
     *      afterDestroyItems: string,
     *      afterResizeWindow: string,
     *      successRenderHeader: string,
     *      successRenderFooter: string,
     *      bindModelObserver: string,
     *      defineGenericGetter: string,
     *      openUrlOnEvent: string,
     *      successCreateElement: string,
     *      successBuildElement: string,
     *      successDestroyElement: string
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
    this.scope.config = Object.assign({}, selfConfig, selfDefaults);

    /**
     * Define mvc components
     * @property MVC
     * @type {mvc.components}
     */
    this.components = opts.components || [opts.components];

    /**
     * Define mvc config
     * @property MVC
     * @type {mvc.config}
     */
    this.config = selfConfig || {};

    /**
     * Define mvc force creating components
     * @property MVC
     * @type {Boolean}
     */
    this.force = typeof opts.force === 'undefined' ? false : opts.force;

    /**
     * Define mvc render
     * @property MVC
     * @type {Boolean}
     */
    this.render = typeof opts.render === 'undefined' ? true : opts.render;

    let config = {};

    /**
     * Define event manager
     * @property BaseEvent
     * @type {Object}
     */
    this.scope.eventmanager = {};

    Object.assign(config, this.scope.config);

    this.init();

    /**
     * Define local instance of eventList
     * @property BaseEvent.eventmanager
     * @type {Object}
     */
    const eventList = this.scope.eventmanager.eventList;

    if (eventList) {

      // Publish before InitConfig event
      this.scope.observer.publish(eventList.beforeInitConfig, ['Config before create', config]);

      // Publish after InitConfig event
      this.scope.observer.publish(eventList.afterInitConfig, ['Config after create', this.scope.config]);
    }
  }

  /**
   * Init MVC
   * @property MVC
   */
  init() {
    this.defineContainment();
    this.applyLogger();
    this.applyConfig();
    this.applyMVC();
    this.applyEventManager();
    this.applyPermissions();
  }

  /**
   * Define parent node
   * @property MVC
   */
  defineContainment() {

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
   * @property MVC
   * @param {Function|String} mvcPattern
   * @param {Boolean} [force]
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
      name = mvcPattern.name.replace(scope.name, '').toLowerCase();

      /**
       * Define pattern
       * @type {*}
       */
      scope[name] = new mvcPattern();

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
            '(', scopeName, ') { this.scope = ', scopeName, '; };'
          ].join('')
      );

      scope[name.toLowerCase()] = new (new fn(scope))(scope);
    }

    return name;
  }

  /**
   * Set relation between MVC components
   * @property MVC
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
   * @property MVC
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

      const pattern = this.defineMVC(mvc, this.force).toLowerCase(),
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
   * @property MVC
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
   * @property MVC
   */
  applyConfig() {
    const scope = this.scope,
        timestamp = this.utils.ts.timestamp(this.config.timestamp),
        config = scope.config;

    config.uuid = this.utils.gen.UUID(this.config.uuid);
    config.timestamp = timestamp;

    if (this.render) {
      config.html = config.html || {};
      config.html.selector = this.utils.str.toDash(scope.name);
    }
  }

  /**
   * Apply event manager
   * @property MVC
   */
  applyEventManager() {

    const scope = this.scope,
        eventmanager = scope.eventmanager;

    if (!eventmanager) {

      scope.logger.warn('Undefined Event manager');
      return false;
    }

    this.applyGlobalEvents();

    eventmanager.scope = scope;
    eventmanager.abstract = eventmanager.abstract || {};

    const eventList = eventmanager.eventList;

    for (let index in eventList) {

      if (eventList.hasOwnProperty(index)) {

        const event = eventList[index];
        let callback = scope.controller[index];

        if (!callback) {
          let method = index.toPoint().split('.'),
              key = method[0];

          method.shift();
          method = ('.' + method.join('.')).toCamel();

          if (this.RESERVED.hasOwnProperty(key)) {

            if (this.RESERVED[key].singular.indexOf(method) > -1) {

              eventmanager.abstract[key + 'Item'] = index;
              callback = scope.controller[key + 'Item'];

            } else if (this.RESERVED[key].plural.indexOf(method) > -1) {

              eventmanager.abstract[key + 'Items'] = index;
              callback = scope.controller[key + 'Items'];

            } else {

              this.scope.logger.warn('Undefined Event Callback', [scope.controller, key + method]);
            }
          }
        }

        eventmanager.subscribe({
          event: event,
          callback: callback
        }, true);
      }
    }

    this.applyDefaultListeners();

    scope.logger.debug('Subscribe events', eventmanager);

    this.applyListeners('local');
    this.applyListeners('global');
  }

  /**
   * Apply default listeners
   * @property MVC
   */
  applyDefaultListeners() {

    /**
     * Local instance of default listeners
     * @type {*}
     */
    const listeners = this.defaultListeners;

    for (let index in listeners) {

      if (listeners.hasOwnProperty(index)) {
        this.scope.eventmanager.subscribe({
          event: listeners[index],
          callback: this.scope.controller[index]
        }, true);
      }
    }
  }

  /**
   * Apply global events
   * @property MVC
   */
  applyGlobalEvents() {

    // Get scope
    const scope = this.scope,
        eventManager = scope.eventmanager;

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
   * @property MVC
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

          /**                                                     ß
           * Define local instance of an event
           * @type {*}
           */
          let event = scopeListener[index];

          if (typeof event === 'string') {
            event = [event];
          }

          for (let i = 0, l = event.length; i < l; i++) {

            scope.eventmanager.subscribe({
              event: {
                eventName: event[i].name,
                params: event[i].params,
                scope: event[i].scope
              },
              callback: event[i].callback
            }, false);
          }
        }
      }
    }

    scope.logger.debug('Apply ' + type + ' listeners', scope[listener]);
  }

  /**
   * Define permissions
   * @property MVC
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
     * @type {BasePermission|{capability}}
     */
    const permission = scope.permission;

    if (!permission) {
      scope.logger.warn('Undefined permissions', permission);
      return false;
    }

    /**
     * Define capability
     * @property BasePermission
     * @type {{}}
     */
    permission.capability = {};

    permission.config ?
        permission.config() :
        scope.logger.warn('Force created permissions', permission);

    scope.logger.debug('Local permissions', permission);
  }

  /**
   * Apply global permissions
   * @property MVC
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

    if (scope.controller.checkCondition({
      condition: typeof mode !== 'undefined',
      type: 'warn',
      msg: 'Undefined ' + type + ' mode'
    })) {
      return false;
    }

    if (scope.controller.checkCondition({
      condition: typeof scopePermission !== 'undefined',
      type: 'warn',
      msg: 'Undefined ' + type + ' permission'
    })) {

      scope.constructor.prototype[permission] = {};
    }

    // Define capability
    const capabilities = scopePermission[mode];

    if (scope.controller.checkCondition({
      condition: typeof capabilities !== 'undefined',
      type: 'warn',
      msg: 'Undefined ' + type + ' capabilities',
      args: mode
    })) {

      scope.constructor.prototype[permission][mode] = {};
    }

    scope.logger.debug('Apply ' + type + ' permissions', capabilities);

    if (!scope.config.permission) {
      scope.config.permission = {};
    }

    Object.assign(scope.config.permission, capabilities);
  }

  /**
   * Apply Logger
   * @property MVC.applyLogger
   */
  applyLogger() {
    this.scope.logger.setConfig(this.scope.config.logger || {});
  }
};