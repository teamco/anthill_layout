/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant CRUD
 * @type {CRUD}
 */
const CRUD = require('./CRUD.js');

/**
 * Define Base model
 * @class BaseModel
 * @extends CRUD
 */
module.exports = class BaseModel extends CRUD {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'BaseModel', scope, false);
  }

  /**
   * Create a two way data-binding between model and controller
   * @property BaseModel
   * @param {object} obj
   * @param {string} property
   * @param {function} fnCallback
   * Example:
   *      user = {};
   *      inputElem = document.getElementById("foo");
   *      bindModelInput(user,'name',inputElem);
   *      user.name = "Joe";
   *      alert("input value is now "+inputElem.value) //input is now
   *     'Joe'; inputElem.value = 'Bob'; alert("user.name is now
   *     "+user.name) //model is now 'Bob';
   */
  bindModelObserver(obj, property, fnCallback) {
    Object.defineProperty(obj, property, {
      get: function get() {
        return fnCallback();
      },
      set: function set(newValue) {
        fnCallback(newValue);
      },
      configurable: true
    });
  }

  /**
   * Get scope config
   * @property BaseModel
   * @param {string} [key]
   * @returns {*}
   */
  getConfig(key) {
    const scope = this.scope,
        config = scope.config;
    let reference = scope.config;

    if (!key) {
      return config;
    }

    /**
     * Split key by slash
     * @type {Array}
     */
    const path = key.split('/');

    for (let i = 0, l = path.length; i < l; i++) {

      /**
       * Get config node
       */
      const node = path[i];

      if (reference.hasOwnProperty(node)) {

        scope.logger.debug('Get config by key', node);
        reference = reference[node];

      } else {
        scope.logger.warn('Undefined config key', node);
        return false;
      }
    }

    scope.logger.debug('Get config', reference);

    return reference;
  }

  /**
   * Set scope config
   * @property BaseModel
   * @param {string} [key]
   * @param {*} [value]
   * @returns {scope.config}
   */
  setConfig(key, value) {

    const scope = this.scope,
        config = scope.config;

    if (config.hasOwnProperty(key)) {
      scope.logger.debug('Update config', key, value);
      config[key] = value;
    }

    scope.logger.debug('Set config new data', key, value);
    config[key] = value;

    return this.getConfig(key);
  }

  /**
   * Get scope namespace
   * @property BaseModel
   * @param {*} node
   * @returns {string}
   */
  getNameSpace(node) {
    const scope = node ? node : this.scope,
        constructor = this.utils._.isFunction(scope) ? scope : scope.constructor;
    return constructor.name.toLowerCase();
  }

  /**
   * Get first item
   * @property BaseModel
   * @returns {*}
   */
  getFirstItem() {

    const items = this.getItems();
    let item;

    for (let index in items) {
      if (items.hasOwnProperty(index)) {

        // Get item
        item = items[index];

        if (item.model.getConfig('order') === 1) {
          break;
        }
      }
    }
    return item;
  }

  /**
   * Find item in a whole project
   * @property BaseModel
   * @param {*} root
   * @param {string} uuid
   * @return {*}
   */
  findItemByUUID(root, uuid) {

    if (!root) {
      this.scope.logger.error('Undefined root', root);
    }

    // Get child node
    const child = root.model.getItemByUUID(uuid);

    if (child) {
      return child;
    }

    // Get all items
    const items = root.model.getItems();

    for (let index in items) {

      if (items.hasOwnProperty(index)) {

        const item = items[index];

        // Recursive search
        const search = item.model.findItemByUUID(item, uuid);

        if (search) {
          return search;
        }
      }
    }
  }

  /**
   * Get parent items
   * @property BaseModel
   * @returns {*}
   */
  getParentItems() {
    return this.scope.controller.getContainment().items;
  }

  /**
   * Get items
   * @property BaseModel
   * @returns {*}
   */
  getItems() {
    return this.scope.items;
  }

  /**
   * Get all items apart of item
   * @property BaseModel
   * @param {{model}} item
   * @returns {Array}
   */
  getItemsApartOf(item) {

    const items = this.getItems(),
        nodes = [],
        uuid = item.model.getUUID();

    for (let index in items) {

      if (items.hasOwnProperty(index)) {

        let node = items[index];
        let nodeUUID = node.model.getUUID();

        if (uuid !== nodeUUID) {
          nodes.push(node);
        }
      }
    }
    return nodes;
  }

  /**
   * Get UUID
   * @property BaseModel
   * @param {{model, name}} [node]
   * @returns {string}
   */
  getUUID(node) {
    return node ? node.model ? node.model.getUUID() : 'Undefined ' + node.name :
        this.getConfig('uuid');
  }

  /**
   * Get content UUID
   * @property BaseModel
   */
  getContentUUID() {
    return [this.getUUID(), 'content'].join('-');
  }

  /**
   * Get item from collector by UUID
   * @property BaseModel
   * @param {string} uuid
   * @returns {*}
   */
  getItemByUUID(uuid) {

    const items = this.getItems(),
        item = items[uuid];

    if (item) {
      return item;
    }

    this.scope.logger.debug('Undefined item');
  }

  /**
   * Get item from collector by title
   * @property BaseModel
   * @param {string} title
   * @returns {*}
   */
  getItemByTitle(title) {

    const items = this.getItems();

    for (let index in items) {

      if (items.hasOwnProperty(index)) {

        /**
         * Get item
         * @type {Page|Widget|*}
         */
        const item = items[index];

        /**
         * Get item title
         * @type {*|string}
         */
        const itemTitle = this.getItemTitle(item);

        if (itemTitle &&
            (itemTitle.toClassName() === title.toClassName())) {
          return item;
        }
      }
    }

    this.scope.logger.debug('Unable locate item by title', items, title);
  }

  /**
   * Get current item
   * @property BaseModel
   * @returns {*}
   */
  getCurrentItem() {

    const scope = this.scope,
        sName = this.getItemNameSpace();

    if (sName === 'object') {
      scope.logger.error('Unable to locate current item');
    }

    return scope[sName];
  }

  /**
   * Get item title
   * @property BaseModel
   * @param {{model}} [node]
   * @returns {string}
   */
  getItemTitle(node) {

    // Reset node
    node = node || this.scope;

    /**
     * Get prefs
     * @type {*}
     */
    const preferences = node.model.getConfig('preferences') || {},
        uuid = node.model.getUUID();

    const title = preferences.title || uuid;

    const resource = preferences.resource,
        isDefault = resource ?
            resource.humanize().toLowerCase() === title.toLowerCase() : false;

    return title.trim().length > 0 && !isDefault ? title : uuid;
  }

  /**
   * Reset collector
   * @property BaseModel
   * @returns {*}
   */
  resetItems() {
    this.scope.items = {};
    return this.getItems();
  }

  /**
   * Delete widget from collector
   * @property BaseModel
   * @param uuid
   * @returns {*}
   */
  deleteItem(uuid) {
    delete this.scope.controller.getContainment().items[uuid];
    return this.getParentItems();
  }

  /**
   * Update collector
   * @property BaseModel
   * @param {string} uuid
   * @param hash
   * returns {*}
   */
  updateItem(uuid, hash) {
    const item = this.getItemByUUID(uuid);
    Object.assign(item, hash);
    return item;
  }

  /**
   * Add item to collector
   * @property BaseModel
   * @param {{model}} node
   * @param {boolean} [force]
   * @returns {*}
   */
  setItem(node, force) {
    node = node || {};
    force = this.utils.setBoolean(force, false);

    const uuid = node.model.getUUID(),
        item = this.getItemByUUID(uuid);
    if (force || !item) {
      this.getItems()[uuid] = node;
    } else if (item) {
      this.scope.logger.warn('Item already in collector');
    }
    return this.getItemByUUID(uuid);
  }

  /**
   * Get Scope constructor name
   * @property BaseModel
   * @returns {string}
   */
  getScopeName() {
    const scope = this.scope;
    scope.logger.debug('Get scope name', scope);
    return scope.name;
  }

  /**
   * Get Item constructor name
   * @property BaseModel
   * @returns {string}
   */
  getItemName() {
    this.scope.logger.debug('Get item name', this.item);
    if (this.hasOwnProperty('item') && this.utils._.isFunction(this.item)) {
      return this.item.name;
    }

    this.scope.logger.debug('Undefined item');
  }

  /**
   * Get Item constructor namespace
   * @property BaseModel
   * @returns {string}
   */
  getItemNameSpace() {
    const name = this.getItemName();
    return name && name.toCamelCase();
  }

  /**
   * Get items order
   * @property BaseModel
   * @returns {*}
   */
  getOrder() {
    return this.getConfig('order');
  }

  /**
   * Set rules on loading
   * @property BaseModel
   * @param rules
   */
  setRules(rules) {

    /**
     * Local rules storage
     * @property BaseModel
     * @type {{}}
     */
    this.rules = rules;
  }

  /**
   * Set Title
   * @property BaseModel
   * @param {string} title
   */
  setTitle(title) {
    this._setItemInfoPreferences('title', title);
  }

  /**
   * Set Description
   * @property BaseModel
   * @param {string} description
   */
  setDescription(description) {
    this._setItemInfoPreferences('description', description);
  }

  /**
   * Set item info preferences
   * @property BaseModel
   * @param {string} index
   * @param value
   * @protected
   */
  _setItemInfoPreferences(
      index,
      value) {

    // Get scope
    const scope = this.scope;

    if (!scope.model.getConfig('preferences')) {
      scope.logger.warn('Root hasn\'t preferences, check field type');
      return false;
    }

    // Update config
    scope.config.preferences[index] = value;

    scope.observer.publish(
        scope.eventManager.eventList.afterUpdatePreferences,
        arguments
    );
  }

  /**
   * Check items limit
   * @property BaseModel
   * @param {Function} constructor
   * @param {Number} limit
   * @returns {boolean}
   */
  checkLimit(constructor, limit) {
    const namespace = this.getNameSpace(constructor);

    limit = limit ? limit : this.getConfig(namespace).limit;

    if (!limit) {
      return false;
    }

    return Object.keys(this.getItems()).length >= limit;
  }

  /**
   * Update items collector
   * @property BaseModel
   * @param {Function} Constructor
   * @param {{}} opts
   * @returns {*}
   */
  updateCollector(Constructor, opts) {

    const namespace = this.getNameSpace(Constructor),
        scope = this.scope,
        cname = Constructor.name;

    let node = scope[cname.toLowerCase()];

    this.setConfig(namespace, scope.config[namespace] || {});

    /**
     * Define limit
     * @type {number}
     */
    const limit = this.getConfig(namespace).limit;

    if (this.checkLimit(Constructor, limit)) {

      scope.logger.warn(
          cname + ': Maximum limit reached',
          limit
      );
      node.model.setConfig('limit', true);

    } else {

      /**
       * Init node
       * @type {Function}
       */
      node = new Constructor(opts || {});

      if (node.model) {
        this.setItem(node);
      } else {
        scope.logger.warn(cname + ' was created with some errors (Model must be defined)', node);
        return false;
      }

      /**
       * Update counter
       * @type {Number}
       */
      scope.config[namespace].counter = Object.keys(this.getItems()).length;

      node.model.setConfig('order', scope.config[namespace].counter);

      /**
       * Store item
       * @type {*}
       */
      scope[cname.toLowerCase()] = node;

      node.model.setConfig('limit', false);
    }

    return node;
  }

  /**
   * Get collector
   * @property BaseModel
   * @param {Workspace|Page|Widget|{name}} Item
   * @returns {*}
   */
  getCollector(Item) {

    /**
     * Get root
     * @type {{model}} Application
     */
    const root = this.scope.controller.root();

    const data = root.model.setting.load(),
        collector = data.collector || {};

    return collector[Item.name.toLowerCase()];
  }

  /**
   * Load data
   * @property BaseModel
   * @param {Workspace|Page|Widget} Item
   * @param {object} collector
   * @param {boolean} [isRoot]
   * @returns {*}
   */
  loadData(Item, collector, isRoot) {

    /**
     * Check sync
     * @param {string} uuid
     * @param index
     * @returns {boolean}
     */
    function _inContainment(uuid, index) {
      return uuid === collector[index].containment || isRoot;
    }

    const scope = this.scope,
        name = Item.name.toLowerCase();

    isRoot = this.utils.setBoolean(isRoot, false);

    if (!collector) {
      scope.logger.debug('Initial load', name);
      scope.observer.publish(scope.eventManager.eventList.afterLoadingItems);
      return false;
    }

    const root = scope.controller.root();
    let counter = 0;

    for (let key in collector) {
      if (collector.hasOwnProperty(key) && _inContainment(this.getUUID(), key)) {
        counter++;
      }
    }

    // Init counter
    root.loadingDataCounter = scope.loadingDataCounter || 0;
    root.loadingDataCounter += counter;

    for (let index in collector) {

      if (collector.hasOwnProperty(index) && _inContainment(this.getUUID(), index)) {
        const node = collector[index] || {};

        // Create item
        scope.api['create' + this.getItemName()](node, true, true);

        /**
         * Define current item
         * @type {*}
         */
        const item = scope[name];

        if (item.model) {

          if (isRoot && node.containment) {
            scope.controller.loadConfig(node.containment);
          }

          /**
           * Reduce counter
           * @property Application
           * @type {number}
           */
          root.loadingDataCounter -= 1;

          // Get child item
          const child = item.model.item;

          if (child) {

            /**
             * Get fn name
             * @type {string}
             */
            const fName = 'load' + child.prototype.name + 's';

            typeof item.model[fName] === 'function' ?
                item.model[fName].apply(item.model) :
                item.logger.warn('Unable execute model method', fName);

          } else {

            item.logger.debug('Node with no items', item);
          }
        }
      }
    }

    if (!root.loadingDataCounter && scope === root) {
      scope.observer.publish(scope.eventManager.eventList.afterLoadingItems);
    }

    return collector;
  }

  /**
   * Check if transfer preferences should be skipped
   * @property BaseModel
   * @param {string} index
   * @returns {boolean}
   */
  checkSkipPreferencesOn(index) {

    /**
     * Define skipTransfer
     * @type {boolean}
     */
    const skipTransfer = this.skipPreferencesOn &&
        this.skipPreferencesOn.indexOf(index) > -1;

    if (skipTransfer) {
      this.scope.logger.debug(
          'Transfer preferences should be skipped'
      );
    }

    return skipTransfer;
  }
};