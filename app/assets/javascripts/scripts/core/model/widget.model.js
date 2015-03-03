/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineWidgetModel(BaseModel) {

    /**
     * Define Widget model
     * @extends BaseModel
     * @class WidgetModel
     * @constructor
     */
    var WidgetModel = function WidgetModel() {
    };

    return WidgetModel.extend('WidgetModel', {

        /**
         * Define DOM
         * @member WidgetModel
         */
        defineDOM: function defineDOM() {

            /**
             * Update DOM
             * @member WidgetModel
             * @type {*}
             */
            this.scope.dom = this.scope.map.getDOM();
        },

        /**
         * Get DOM
         * @member WidgetModel
         * @returns {*}
         */
        getDOM: function getDOM() {
            return this.scope.dom;
        },

        /**
         * Update DOM
         * @member WidgetModel
         * @param {*} hash
         * @returns {*}
         */
        updateDOM: function updateDOM(hash) {

            var scope = this.scope;

            scope.logger.debug('Update DOM', hash);
            $.extend(true, scope.dom, hash);

            return scope;
        },

        /**
         * Get attributes
         * @member WidgetModel
         * @returns {*}
         */
        getAttributes: function getAttributes() {
            return this.getConfig('attributes');
        },

        /**
         * Set attributes
         * @member WidgetModel
         * @param key
         * @param value
         */
        setAttributes: function setAttributes(key, value) {
            this.scope.logger.debug('Set widget attributes', arguments);
            this.getAttributes()[key] = value;
        },

        /**
         * Update rules
         * @member WidgetModel
         * @param data
         */
        updateRules: function updateRules(data) {

            /**
             * Get rules
             * @type {*}
             */
            var rules = this.getConfig('rules');

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    rules[index] = data[index];
                }
            }
        },

        /**
         * Define subscribers
         * @member WidgetModel
         * @param {string} event
         * @param {Widget} subscriber
         */
        setSubscriber: function setSubscriber(event, subscriber) {

            /**
             * Get rules
             * @type {*}
             */
            var rules = this.getConfig('rules'),
                uuid = subscriber.model.getUUID();

            rules.subscribers = this.base.define(rules.subscribers, {}, true);
            rules.subscribers[event] = this.base.define(rules.subscribers[event], [], true);

            if ($.inArray(uuid, rules.subscribers[event]) === -1) {

                rules.subscribers[event].push(uuid);
            }
        },

        /**
         * Set widget input-radio preferences
         * @member WidgetModel
         * @param {string} eventName
         */
        setRadioPreferences: function setRadioPreferences(eventName) {

            if (typeof(this[eventName]) === 'function') {

                this[eventName](eventName);

            } else {

                this.scope.logger.warn('Undefined event', eventName);
            }
        },

        /**
         * Set layer (radio)
         * @member WidgetModel
         * @param {string} eventName
         */
        setLayer: function setLayer(eventName) {
            this.setRadioPreferences(eventName);
        },

        /**
         * Set stick (radio)
         * @member WidgetModel
         * @param {string} eventName
         */
        setStick: function setStick(eventName) {
            this.setRadioPreferences(eventName);
        },

        /**
         * Set stretch width
         * Adopt to container width
         * @member WidgetModel
         * @param {boolean} stretch
         */
        setStretchWidth: function setStretchWidth(stretch) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('stretchWidth', stretch);

            scope.observer.publish(
                scope.eventmanager.eventList.stretchWidth,
                stretch
            );
        },

        /**
         * Set stretch height
         * Adopt to container height
         * @member WidgetModel
         * @param {boolean} stretch
         */
        setStretchHeight: function setStretchHeight(stretch) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('stretchHeight', stretch);

            scope.observer.publish(
                scope.eventmanager.eventList.stretchHeight,
                stretch
            );
        },

        /**
         * Set stick to
         * @param {string} eventName
         * @member WidgetModel
         * @returns {boolean}
         * @private
         */
        _setStickTo: function _setStickTo(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList[eventName]
            );
        },

        /**
         * Unset stick
         * @member WidgetModel
         * @param {string} eventName
         */
        unsetStick: function unsetStick(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStickToCenterLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStickToCenterTop: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStickToCenter: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStickToCenterBottom: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStickToCenterRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStickToTopLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStickToBottomLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStickToTopRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStickToBottomRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Set on top
         * @member WidgetModel
         * @param {boolean} ontop
         */
        setAlwaysOnTop: function setAlwaysOnTop(ontop) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            this.scope.config.preferences.alwaysOnTop = ontop;

            scope.observer.publish(
                scope.eventmanager.eventList.setAlwaysOnTop,
                ontop
            );
        },

        /**
         * Save widget layer
         * @member WidgetModel
         * @param {string} eventName
         */
        setLayerUp: function setLayerUp(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList[eventName],
                true
            );
        },

        /**
         * Save widget layer
         * @member WidgetModel
         * @param {string} eventName
         */
        setLayerDown: function setLayerDown(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList[eventName],
                true
            );
        },

        /**
         * Set overlapping
         * @member WidgetModel
         * @param {boolean} overlapping
         */
        setOverlapping: function setOverlapping(overlapping) {
            this.scope.config.preferences.overlapping = overlapping;
        },

        /**
         * Set on click Url
         * @member WidgetModel
         * @param {string} url
         */
        setOnClickOpenUrl: function setOnClickOpenUrl(url) {

            this._setItemInfoPreferences('onClickOpenUrl', url);

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.setOnClickUrl,
                url
            );
        },

        /**
         * Set statistics
         * @member WidgetModel
         * @param {boolean} statistics
         */
        setStatistics: function setStatistics(statistics) {
            this._setItemInfoPreferences('statistics', statistics);
        },

        /**
         * Set maximizable
         * @member WidgetModel
         * @param {boolean} maximizable
         */
        setMaximizable: function setMaximizable(maximizable) {
            this._setItemInfoPreferences('maximizable', maximizable);

            /**
             * Get scope
             * @type {Widget}
             */
            var scope = this.scope;

            if (!maximizable) {
                scope.observer.publish(
                    scope.eventmanager.eventList.reduceWidget
                );
            }
        },

        /**
         * Set draggable
         * @member WidgetModel
         * @param {boolean} draggable
         */
        setDraggable: function setDraggable(draggable) {
            this._setItemInfoPreferences('draggable', draggable);
        },

        /**
         * Set resizable
         * @member WidgetModel
         * @param {boolean} resizable
         */
        setResizable: function setResizable(resizable) {
            this._setItemInfoPreferences('resizable', resizable);
        },

        /**
         * Set freeze
         * @member WidgetModel
         * @param {boolean} freeze
         */
        setFreeze: function setFreeze(freeze) {
            this._setItemInfoPreferences('freeze', freeze);
        },

        /**
         * Set expandable
         * @member WidgetModel
         * @param {boolean} expandable
         */
        setExpandable: function setExpandable(expandable) {
            this._setItemInfoPreferences('expandable', expandable);
        },

        /**
         * Set scrollable
         * @member WidgetModel
         * @param {boolean} scrollable
         */
        setScrollable: function setScrollable(scrollable) {

            this._setItemInfoPreferences('scrollable', scrollable);

            /**
             * Get scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.scrollContent,
                scrollable
            );
        }

    }, BaseModel.prototype);
});