/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

import {CRUD} from './CRUD';

/**
 * Define Base model
 * @class BaseModel
 * @extends CRUD
 */
export class BaseModel extends CRUD {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'BaseModel', scope);
  }

  /**
   * Create a two way data-binding between model and controller
   * @memberOf BaseModel
   * @param {object} obj
   * @param {string} memberOf
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
  bindModelObserver(obj, memberOf, fnCallback) {
    Object.defineProperty(obj, memberOf, {
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
   * @memberOf BaseModel
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

      if (Object.prototype.hasOwnProperty.call(reference, node)) {
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
   * @memberOf BaseModel
   * @param {string} [key]
   * @param {*} [value]
   * @returns {scope.config}
   */
  setConfig(key, value) {
    const scope = this.scope,
        config = scope.config;

    if (Object.prototype.hasOwnProperty.call(config, key)) {
      scope.logger.debug('Update config', key, value);
      config[key] = value;
    }

    scope.logger.debug('Set config new data', key, value);
    config[key] = value;

    return this.getConfig(key);
  }

  /**
   * Get scope namespace
   * @memberOf BaseModel
   * @param {*} node
   * @returns {string}
   */
  getNameSpace(node) {
    const scope = node ? node : this.scope,
        constructor = window._.isFunction(scope) ? scope : scope.constructor;
    return constructor.name.toLowerCase();
  }

  /**
   * Get first item
   * @memberOf BaseModel
   * @returns {*}
   */
  getFirstItem() {
    const items = this.getItems() || {};
    const uuids = Object.keys(items).sort((a, b) => {
      const keyA = items[a].model.getConfig('order'),
          keyB = items[b].model.getConfig('order');
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    const item = items[uuids[0]];

    if (!item) {
      this.scope.logger.warn('Unable to get first item', items, uuids);
    }

    return item;
  }

  /**
   * Find item in a whole project
   * @memberOf BaseModel
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
      if (Object.prototype.hasOwnProperty.call(items, index)) {
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
   * @memberOf BaseModel
   * @returns {*}
   */
  getParentItems() {
    return this.scope.controller.getContainment().items;
  }

  /**
   * Get items
   * @memberOf BaseModel
   * @returns {*}
   */
  getItems() {
    return this.scope.items;
  }

  /**
   * Get all items apart of item
   * @memberOf BaseModel
   * @param {{model}} item
   * @returns {Array}
   */
  getItemsApartOf(item) {
    const items = this.getItems(),
        nodes = [],
        uuid = item.model.getUUID();

    for (let index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {
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
   * @memberOf BaseModel
   * @param {{model, name}} [node]
   * @returns {string}
   */
  getUUID(node) {
    return node ? node.model ? node.model.getUUID() : 'Undefined ' + node.name :
        this.getConfig('uuid');
  }

  /**
   * Get content UUID
   * @memberOf BaseModel
   */
  getContentUUID() {
    return [this.getUUID(), 'content'].join('-');
  }

  /**
   * Get item from collector by UUID
   * @memberOf BaseModel
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
   * @memberOf BaseModel
   * @param {string} uuid
   * @param scope
   * @return {*}
   */
  findByUUID(uuid, scope = this.scope.controller.root()) {
    const items = scope.model.getItems() || {};
    if (items[uuid]) {
      return items[uuid];
    }
    for (let index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {
        return this.findByUUID(uuid, items[index]);
      }
    }
  }

  /**
   * Get item from collector by title
   * @memberOf BaseModel
   * @param {string} title
   * @returns {*}
   */
  getItemByTitle(title) {
    const items = this.getItems();

    for (let index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {

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

        if (itemTitle && (itemTitle.toClassName() === title.toClassName())) {
          return item;
        }
      }
    }

    this.scope.logger.debug('Unable locate item by title', items, title);
  }

  /**
   * Get current item
   * @memberOf BaseModel
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
   * @memberOf BaseModel
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
            resource.humanize().toLowerCase() === title.toLowerCase() :
            false;

    return title.trim().length && !isDefault ? title : uuid;
  }

  /**
   * Reset collector
   * @memberOf BaseModel
   * @returns {*}
   */
  resetItems() {
    this.scope.items = {};
    return this.getItems();
  }

  /**
   * Delete widget from collector
   * @memberOf BaseModel
   * @param uuid
   * @returns {*}
   */
  deleteItem(uuid) {
    delete this.scope.controller.getContainment().items[uuid];
    return this.getParentItems();
  }

  /**
   * Update collector
   * @memberOf BaseModel
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
   * @memberOf BaseModel
   * @param {{model, logger}} node
   * @param {boolean} [force]
   * @returns {*}
   */
  setItem(node, force) {
    force = this.utils.setBoolean(force, false);

    if (node && !node.model) {
      node.logger.warn('Model should be defined');
      return false;
    }
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
   * @memberOf BaseModel
   * @returns {string}
   */
  getScopeName() {
    const scope = this.scope;
    scope.logger.debug('Get scope name', scope);
    return scope.name;
  }

  /**
   * Get Item constructor name
   * @memberOf BaseModel
   * @returns {string}
   */
  getItemName() {
    this.scope.logger.debug('Get item name', this.item);
    if (Object.prototype.hasOwnProperty.call(this, 'item') &&
        window._.isFunction(this.item)) {
      return this.item.name;
    }

    this.scope.logger.debug('Undefined item');
  }

  /**
   * Get Item constructor namespace
   * @memberOf BaseModel
   * @returns {string}
   */
  getItemNameSpace() {
    const name = this.getItemName();
    return name && name.toCamelCase();
  }

  /**
   * Get items order
   * @memberOf BaseModel
   * @returns {*}
   */
  getOrder() {
    return this.getConfig('order');
  }

  /**
   * Set rules on loading
   * @memberOf BaseModel
   * @param rules
   */
  setRules(rules) {

    /**
     * Local rules storage
     * @memberOf BaseModel
     * @type {{}}
     */
    this.rules = rules;
  }

  /**
   * Set Title
   * @memberOf BaseModel
   * @param {string} title
   */
  setTitle(title) {
    this._setItemInfoPreferences('title', title);
  }

  /**
   * Set Description
   * @memberOf BaseModel
   * @param {string} description
   */
  setDescription(description) {
    this._setItemInfoPreferences('description', description);
  }

  /**
   * Set item info preferences
   * @memberOf BaseModel
   * @param {string} index
   * @param value
   * @protected
   */
  _setItemInfoPreferences(index, value) {

    // Get scope
    const scope = this.scope;

    if (!scope.model.getConfig('preferences')) {
      scope.logger.warn('Root hasn\'t preferences, check field type');
      return false;
    }

    // Update config
    scope.config.preferences[index] = value;
    scope.observer.publish(scope.eventManager.eventList.afterUpdatePreferences, arguments);
  }

  /**
   * Check items limit
   * @memberOf BaseModel
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
   * @memberOf BaseModel
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
      scope.logger.warn(cname + ': Maximum limit reached', limit);
      node.model.setConfig('limit', true);
    } else {

      /**
       * Init node
       * @type {Function}
       */
      node = new Constructor(opts || {});

      if (node.model) {
        node.model.setConfig('order', scope.config[namespace].counter);
        node.model.setConfig('limit', false);
      } else {
        scope.logger.warn(`${cname} was created with some errors (Model must be defined)`, node);
      }

      this.setItem(node);

      /**
       * Update counter
       * @type {Number}
       */
      scope.config[namespace].counter = Object.keys(this.getItems()).length;

      /**
       * Store item
       * @type {*}
       */
      scope[cname.toLowerCase()] = node;
    }

    return node;
  }

  /**
   * Get collector
   * @memberOf BaseModel
   * @param {Workspace|Page|Widget|{name}|string} Item
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

    let name = '';
    if (typeof Item === 'string') {
      name = Item;
    } else {
      name = (Item || {}).name || '';
    }
    name = name.toLowerCase();

    if (collector[name]) {
      return collector[name];
    } else if (root.model.getConfig('version') === 1) {
      this.scope.logger.info(`First time load ${name} data collector`, data.collector);
    } else {
      this.scope.logger.warn(`Unable to get ${name} data collector`, data.collector);
    }
  }

  /**
   * Load data
   * @memberOf BaseModel
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
      if (Object.prototype.hasOwnProperty.call(collector, key) &&
          _inContainment(this.getUUID(), key)) {
        counter++;
      }
    }

    // Init counter
    root.loadingDataCounter = scope.loadingDataCounter || 0;
    root.loadingDataCounter += counter;

    for (let index in collector) {
      if (Object.prototype.hasOwnProperty.call(collector, index) &&
          _inContainment(this.getUUID(), index)) {
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
           * @memberOf Application
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
            const fName = 'load' + child.name + 's';

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
   * @memberOf BaseModel
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
      this.scope.logger.debug('Transfer preferences should be skipped');
    }

    return skipTransfer;
  }
}