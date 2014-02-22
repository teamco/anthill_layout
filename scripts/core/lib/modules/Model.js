/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/crud'
], function initModel(CRUD) {

    /**
     * Define Base model
     * @class BaseModel
     * @constructor
     */
    var BaseModel = function BaseModel() {

    };

    return BaseModel.extend({

        /**
         * Get scope config
         * @param {String} [key]
         * @returns {*}
         */
        getConfig: function getConfig(key) {
            var scope = this.scope,
                config = scope.config;

            if (config.hasOwnProperty(key)) {
                scope.logger.debug('Get config by key', key);
                return config[key];
            }

            if (this.scope.controller.checkCondition({
                condition: anthill.base.isDefined(key),
                type: 'warn',
                msg: 'Undefined config key',
                args: [key]
            })) {
                return false;
            }

            scope.logger.debug('Get config', config);

            return config;
        },

        /**
         * Get parent config by key
         * @param key
         * @returns {*}
         */
        getParentConfig: function getParentConfig(key) {
            return this.scope.containment.model.getConfig(key);
        },

        /**
         * Set scope config
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
         * @param {*} node
         * @returns {string}
         */
        getNameSpace: function getNameSpace(node) {
            var base = anthill.base,
                scope = base.isDefined(node) ?
                    node : this.scope,
                constructor = base.isFunction(scope) ?
                    scope : scope.constructor;

            return constructor.name.toLowerCase();
        },

        /**
         * Get parent items
         * @returns {*}
         */
        getParentItems: function getParentItems() {
            return this.scope.controller.getContainment().items;
        },

        /**
         * Get items
         * @returns {*}
         */
        getItems: function getItems() {
            return this.scope.items;
        },

        /**
         * Get all items apart of item
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
         * @param {{model}} [node]
         * @returns {String}
         */
        getUUID: function getUUID(node) {
            return anthill.base.isDefined(node) ?
                node.model ?
                    node.model.getUUID() :
                    'Undefined ' + node.constructor.name :
                this.getConfig('uuid');
        },

        /**
         * Get item from collector by UUID
         * @param {string} uuid
         * @returns {*}
         */
        getItemByUUID: function getItemByUUID(uuid) {
            var base = anthill.base,
                items = this.getItems(),
                item = base.lib.hash.isHashKey(items, uuid) ?
                    items[uuid] : undefined;

            if (!base.isDefined(item)) {
                this.scope.logger.debug('Undefined item');
            }
            return item;
        },

        /**
         * Reset collector
         * @returns {*}
         */
        resetItems: function resetItems() {
            this.scope.items = {};
            return this.getItems();
        },

        /**
         * Delete widget from collector
         * @param uuid
         * @returns {*}
         */
        deleteItem: function deleteItem(uuid) {
            delete this.scope.controller.getContainment().items[uuid];
            return this.getParentItems();
        },

        /**
         * Update collector
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
         * @param {{model}} node
         * @param {boolean} [force]
         * @returns {*}
         */
        setItem: function setItem(node, force) {
            var base = anthill.base;

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
         * @returns {string}
         */
        getItemNameSpace: function getItemNameSpace() {
            this.scope.logger.debug('Get item namespace');
            if (this.hasOwnProperty('item')) {
                return this.item.name.toLowerCase();
            }

            this.scope.logger.debug('Undefined item');
        },

        /**
         * Get items order
         * @returns {*}
         */
        getOrder: function getOrder() {
            return this.getConfig('order');
        },

        /**
         * Check items limit
         * @param {Function} constructor
         * @param {Number} limit
         * @returns {boolean}
         */
        checkLimit: function checkLimit(constructor, limit) {
            var base = anthill.base,
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
         * @param {Function} Constructor
         * @param {{}} opts
         * @returns {*}
         */
        updateCollector: function updateCollector(Constructor, opts) {

            var namespace = this.getNameSpace(Constructor),
                scope = this.scope,
                cname = Constructor.name,
                node = scope[cname.toLowerCase()],
                base = anthill.base;

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
                 * @type {Constructor}
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
         * @param data
         * @returns {*}
         */
        loadData: function loadData(data) {

            /**
             * Set data
             */
            data = anthill.base.isDefined(data) ?
                data : this.setting.load();

            if (!data.hasOwnProperty('collector')) {
                return false;
            }

            if (!anthill.base.isDefined(this.item)) {
                return data.collector;
            }

            var cname = this.item.name,
                lname = cname.toLowerCase(),
                collector = anthill.base.define(data.collector, {}, true);

            if (collector.hasOwnProperty(lname)) {

                for (var index in collector[lname]) {
                    if (collector[lname].hasOwnProperty(index)) {

                        // Create item
                        this.scope.api['create' + cname](
                            anthill.base.define(collector[lname][index], {}, true),
                            true,
                            true
                        );
                    }
                }
            }

            this.loadData.bind(this.scope[lname].model)(data);

            return data.collector;
        }

    }, CRUD.prototype);

});