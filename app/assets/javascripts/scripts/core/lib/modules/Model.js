/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/CRUD'
], function initModel(AntHill, CRUD) {

    /**
     * Define Base model
     * @class BaseModel
     * @extends CRUD
     * @extends AntHill
     * @constructor
     */
    var BaseModel = function BaseModel() {

        /**
         * Define scope
         * @property BaseModel
         * @type {undefined}
         */
        this.scope = undefined;

        /**
         * Define skipPreferencesOn
         * @property BaseModel
         * @type {undefined}
         */
        this.skipPreferencesOn = undefined;

        /**
         * Define setting
         * @property BaseModel
         * @type {undefined}
         */
        this.setting = undefined;
    };

    return BaseModel.extend(
        'BaseModel', {

            /**
             * Create a two way data-binding between model and controller
             * @memberOf BaseModel
             * @param {object} obj
             * @param {string} property
             * @param {function} fnCallback
             * Example:
             *      user = {};
             *      inputElem = document.getElementById("foo");
             *      bindModelInput(user,'name',inputElem);
             *      user.name = "Joe";
             *      alert("input value is now "+inputElem.value) //input is now 'Joe';
             *      inputElem.value = 'Bob';
             *      alert("user.name is now "+user.name) //model is now 'Bob';
             */
            bindModelObserver: function bindModelObserver(obj, property, fnCallback) {
                Object.defineProperty(obj, property, {
                    get: function get() {
                        return fnCallback();
                    },
                    set: function set(newValue) {
                        fnCallback(newValue);
                    },
                    configurable: true
                });
            },

            /**
             * Get scope config
             * @memberOf BaseModel
             * @param {String} [key]
             * @returns {*}
             */
            getConfig: function getConfig(key) {
                var scope = this.scope,
                    config = scope.config,
                    reference = scope.config;

                if (typeof(key) === 'undefined') {
                    return config;
                }

                /**
                 * Split key by slash
                 * @type {Array}
                 */
                var path = key.split('/');

                for (var i = 0, l = path.length; i < l; i++) {

                    /**
                     * Get config node
                     */
                    var node = path[i];

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
            },

            /**
             * Set scope config
             * @memberOf BaseModel
             * @param {String} [key]
             * @param {*} [value]
             * @returns {scope.config}
             */
            setConfig: function setConfig(key, value) {

                var scope = this.scope,
                    config = scope.config;

                if (config.hasOwnProperty(key)) {
                    scope.logger.debug('Update config', key, value);
                    config[key] = value;
                }

                scope.logger.debug('Set config new data', key, value);
                config[key] = value;

                return this.getConfig(key);
            },

            /**
             * Get scope namespace
             * @memberOf BaseModel
             * @param {*} node
             * @returns {string}
             */
            getNameSpace: function getNameSpace(node) {
                var base = this.base,
                    scope = base.isDefined(node) ?
                        node : this.scope,
                    constructor = base.isFunction(scope) ?
                        scope : scope.constructor;

                return constructor.prototype.name.toLowerCase();
            },

            /**
             * Find item in a whole project
             * @memberOf BaseModel
             * @param {*} root
             * @param {string} uuid
             * @return {*}
             */
            findItemByUUID: function findItemByUUID(root, uuid) {

                if (!root) {
                    this.scope.logger.error('Undefined root', root);
                }

                // Get child node
                var child = root.model.getItemByUUID(uuid);

                if (child) {
                    return child;
                }

                // Get all items
                var items = root.model.getItems();

                for (var index in items) {

                    if (items.hasOwnProperty(index)) {

                        var item = items[index];

                        // Recursive search
                        var search = item.model.findItemByUUID(
                            item, uuid
                        );

                        if (search) {
                            return search;
                        }
                    }
                }
            },

            /**
             * Get parent items
             * @memberOf BaseModel
             * @returns {*}
             */
            getParentItems: function getParentItems() {
                return this.scope.controller.getContainment().items;
            },

            /**
             * Get items
             * @memberOf BaseModel
             * @returns {*}
             */
            getItems: function getItems() {
                return this.scope.items;
            },

            /**
             * Get all items apart of item
             * @memberOf BaseModel
             * @param {{model}} item
             * @returns {Array}
             */
            getItemsApartOf: function getItemsApartOf(item) {

                var items = this.getItems(),
                    nodes = [], index, node, nodeUUID,
                    uuid = item.model.getUUID();

                for (index in items) {

                    if (items.hasOwnProperty(index)) {

                        node = items[index];
                        nodeUUID = node.model.getUUID();

                        if (uuid !== nodeUUID) {
                            nodes.push(node);
                        }
                    }
                }
                return nodes;
            },

            /**
             * Get UUID
             * @memberOf BaseModel
             * @param {{model}} [node]
             * @returns {String}
             */
            getUUID: function getUUID(node) {
                return this.base.isDefined(node) ?
                    node.model ?
                        node.model.getUUID() :
                    'Undefined ' + node.constructor.prototype.name :
                    this.getConfig('uuid');
            },

            /**
             * Get content UUID
             * @memberOf BaseModel
             */
            getContentUUID: function getContentUUID() {
                return [
                    this.getUUID(),
                    'content'
                ].join('-');
            },

            /**
             * Get item from collector by UUID
             * @memberOf BaseModel
             * @param {string} uuid
             * @returns {*}
             */
            getItemByUUID: function getItemByUUID(uuid) {

                var base = this.base,
                    items = this.getItems(),
                    item = items[uuid];

                if (base.isDefined(item)) {
                    return item;
                }

                this.scope.logger.debug('Undefined item');
            },

            /**
             * Get item from collector by title
             * @memberOf BaseModel
             * @param {string} title
             * @returns {*}
             */
            getItemByTitle: function getItemByTitle(title) {

                var items = this.getItems(),
                    index, item;

                for (index in items) {

                    if (items.hasOwnProperty(index)) {

                        /**
                         * Get item
                         * @type {Page|Widget|*}
                         */
                        item = items[index];

                        /**
                         * Get item title
                         * @type {*|string}
                         */
                        var itemTitle = this.getItemTitle(item);

                        if (itemTitle && (itemTitle.toClassName() === title.toClassName())) {
                            return item;
                        }
                    }
                }

                this.scope.logger.debug('Unable locate item by title', items, title);
            },

            /**
             * Get current item
             * @memberOf BaseModel
             * @returns {*}
             */
            getCurrentItem: function getCurrentItem() {

                var scope = this.scope,
                    sname = this.getItemNameSpace();

                if (sname === 'object') {
                    scope.logger.error(
                        'Unable to locate current item'
                    );
                }

                return scope[sname];
            },

            /**
             * Get item title
             * @memberOf BaseModel
             * @param {Page|Widget} [node]
             * @returns {string}
             */
            getItemTitle: function getItemTitle(node) {

                // Reset node
                node = node || this.scope;

                /**
                 * Get prefs
                 * @type {*}
                 */
                var preferences = node.model.getConfig('preferences') || {},
                    uuid = node.model.getUUID();

                var title = this.base.define(
                    preferences.title,
                    uuid,
                    true
                );

                return $.trim(title).length > 0 ?
                    title : uuid;
            },

            /**
             * Reset collector
             * @memberOf BaseModel
             * @returns {*}
             */
            resetItems: function resetItems() {
                this.scope.items = {};
                return this.getItems();
            },

            /**
             * Delete widget from collector
             * @memberOf BaseModel
             * @param uuid
             * @returns {*}
             */
            deleteItem: function deleteItem(uuid) {
                delete this.scope.controller.getContainment().items[uuid];
                return this.getParentItems();
            },

            /**
             * Update collector
             * @memberOf BaseModel
             * @param {string} uuid
             * @param hash
             * returns {*}
             */
            updateItem: function updateItem(uuid, hash) {
                var item = this.getItemByUUID(uuid);
                $.extend(true, item, hash);
                return item;
            },

            /**
             * Add item to collector
             * @memberOf BaseModel
             * @param {{model}} node
             * @param {boolean} [force]
             * @returns {*}
             */
            setItem: function setItem(node, force) {
                var base = this.base;

                node = base.define(node, {}, true);
                force = base.defineBoolean(force, false, true);

                var uuid = node.model.getUUID(),
                    item = base.isDefined(this.getItemByUUID(uuid));
                if (force || !item) {
                    this.getItems()[uuid] = node;
                } else if (item) {
                    this.scope.logger.warn('Item already in collector');
                }
                return this.getItemByUUID(uuid);
            },

            /**
             * Get Item constructor name
             * @memberOf BaseModel
             * @returns {string}
             */
            getItemNameSpace: function getItemNameSpace() {
                this.scope.logger.debug('Get item namespace', this.item);
                if (this.hasOwnProperty('item') && this.base.isFunction(this.item)) {
                    return this.item.prototype.name.toLowerCase();
                }

                this.scope.logger.debug('Undefined item');
            },

            /**
             * Get items order
             * @memberOf BaseModel
             * @returns {*}
             */
            getOrder: function getOrder() {
                return this.getConfig('order');
            },

            /**
             * Set rules on loading
             * @memberOf BaseModel
             * @param rules
             */
            setRules: function setRules(rules) {

                /**
                 * Local rules storage
                 * @memberOf BaseModel
                 * @type {{}}
                 */
                this.rules = rules;
            },

            /**
             * Set Title
             * @memberOf BaseModel
             * @param {string} title
             */
            setTitle: function setTitle(title) {
                this._setItemInfoPreferences('title', title);
            },

            /**
             * Set Description
             * @memberOf BaseModel
             * @param {string} description
             */
            setDescription: function setDescription(description) {
                this._setItemInfoPreferences('description', description);
            },

            /**
             * Set item info preferences
             * @memberOf BaseModel
             * @param {string} index
             * @param value
             * @protected
             */
            _setItemInfoPreferences: function _setItemInfoPreferences(index, value) {

                // Update config
                this.scope.config.preferences[index] = value;

                this.scope.observer.publish(
                    this.scope.eventManager.eventList.afterUpdatePreferences,
                    arguments
                );
            },

            /**
             * Check items limit
             * @memberOf BaseModel
             * @param {Function} constructor
             * @param {Number} limit
             * @returns {boolean}
             */
            checkLimit: function checkLimit(constructor, limit) {
                var base = this.base,
                    namespace = this.getNameSpace(constructor);

                limit = base.isDefined(limit) ?
                    limit :
                    this.getConfig(namespace).limit;

                if (!base.isDefined(limit)) {
                    return false;
                }

                return base.lib.hash.hashLength(this.getItems()) >= limit;

            },

            /**
             * Update items collector
             * @memberOf BaseModel
             * @param {function} Constructor
             * @param {{}} opts
             * @returns {*}
             */
            updateCollector: function updateCollector(Constructor, opts) {

                var namespace = this.getNameSpace(Constructor),
                    scope = this.scope,
                    cname = Constructor.name,
                    node = scope[cname.toLowerCase()],
                    base = this.base;

                this.setConfig(namespace, base.define(scope.config[namespace], {}, true));

                /**
                 * Define limit
                 * @type {number}
                 */
                var limit = this.getConfig(namespace).limit;

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
                    node = new Constructor(base.define(opts, {}, true));

                    if (base.isDefined(node.model)) {

                        this.setItem(node);

                    } else {

                        scope.logger.warn(
                            cname + ' was created with some errors',
                            node
                        );
                    }

                    /**
                     * Update counter
                     * @type {Number}
                     */
                    scope.config[namespace].counter =
                        base.lib.hash.hashLength(this.getItems());

                    node.model.setConfig('order', scope.config[namespace].counter);

                    /**
                     * Store item
                     * @type {*}
                     */
                    scope[cname.toLowerCase()] = node;

                    node.model.setConfig('limit', false);
                }

                return node;
            },

            /**
             * Load data
             * @memberOf BaseModel
             * @param [data]
             * @returns {*}
             */
            loadData: function loadData(data) {

                // Define local scope
                var scope = this.scope,
                    base = this.base;

                scope.controller.setAsLoading(true);

                /**
                 * Set data
                 * @type {object}
                 */
                data = base.isDefined(data) ?
                    data : this.setting.load();

                if (!data.hasOwnProperty('collector')) {

                    scope.observer.publish(
                        scope.eventManager.eventList.afterLoadingItems
                    );

                    return false;
                }

                if (base.isDefined(this.item)) {

                    var root = scope.controller.root(),
                        isRoot = scope.controller.isRoot(scope),
                        cname = this.item.name,
                        lname = cname.toLowerCase(),
                        collector = base.define(data.collector, {}, true);

                    /**
                     * Define counter
                     * @memberOf Application
                     * @type {number}
                     */
                    root.loadingDataCounter = base.isDefined(root.loadingDataCounter) ?
                        root.loadingDataCounter : $.map(collector, function (k) {
                        return $.map(k, function (i) {
                            return i;
                        });
                    }).length;

                    if (collector.hasOwnProperty(lname)) {

                        var items = collector[lname],
                            index, node;

                        for (index in items) {

                            if (items.hasOwnProperty(index)) {

                                if (this.getUUID() === items[index].containment || isRoot) {

                                    node = base.define(items[index], {}, true);

                                    // Create item
                                    scope.api['create' + cname](
                                        node, true, true
                                    );

                                    /**
                                     * Define current item
                                     * @type {*}
                                     */
                                    var item = scope[lname];

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

                                        // Continue loading data
                                        this.loadData.bind(item.model)(data);
                                    }
                                }
                            }

                        }

                        if (!root.loadingDataCounter) {
                            scope.observer.publish(
                                scope.eventManager.eventList.afterLoadingItems
                            );
                        }
                    }

                } else {

                    scope.controller.setAsLoading(true);
                }

                return data.collector;
            },

            /**
             * Check if transfer preferences should be skipped
             * @memberOf BaseModel
             * @param {string} index
             * @returns {boolean}
             */
            checkSkipPreferencesOn: function checkSkipPreferencesOn(index) {

                /**
                 * Define skipTransfer
                 * @type {boolean}
                 */
                var skipTransfer = this.skipPreferencesOn &&
                    this.skipPreferencesOn.indexOf(index) > -1;

                if (skipTransfer) {
                    this.scope.logger.debug(
                        'Transfer preferences should be skipped'
                    );
                }

                return skipTransfer;
            }

        },
        AntHill.prototype,
        CRUD.prototype
    );
});