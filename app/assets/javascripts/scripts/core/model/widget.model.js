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
         * @memberOf WidgetModel
         */
        defineDOM: function defineDOM() {

            /**
             * Update DOM
             * @memberOf WidgetModel
             * @type {*}
             */
            this.scope.dom = this.scope.map.getDOM();
        },

        /**
         * Get DOM
         * @memberOf WidgetModel
         * @returns {*}
         */
        getDOM: function getDOM() {
            return this.scope.dom;
        },

        /**
         * Update DOM
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
         * @returns {*}
         */
        getAttributes: function getAttributes() {
            return this.getConfig('attributes');
        },

        /**
         * Set attributes
         * @memberOf WidgetModel
         * @param key
         * @param value
         */
        setAttributes: function setAttributes(key, value) {
            this.scope.logger.debug('Set widget attributes', arguments);
            this.getAttributes()[key] = value;
        },

        /**
         * Update rules
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setLayer: function setLayer(eventName) {
            this.setRadioPreferences(eventName);
        },

        /**
         * Set stick (radio)
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStick: function setStick(eventName) {
            this.setRadioPreferences(eventName);
        },

        /**
         * Set stretch width
         * Adopt to container width
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        unsetStick: function unsetStick(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStickToCenterLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStickToCenterTop: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStickToCenter: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStickToCenterBottom: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStickToCenterRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStickToTopLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStickToBottomLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStickToTopRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @memberOf WidgetModel
         * @param {string} eventName
         */
        setStickToBottomRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Set on top
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
         * @param {boolean} overlapping
         */
        setOverlapping: function setOverlapping(overlapping) {
            this.scope.config.preferences.overlapping = overlapping;
        },

        /**
         * Set on click Url
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
         * @param {boolean} statistics
         */
        setStatistics: function setStatistics(statistics) {
            this._setItemInfoPreferences('statistics', statistics);
        },

        /**
         * Set maximizable
         * @memberOf WidgetModel
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
         * @memberOf WidgetModel
         * @param {boolean} draggable
         */
        setDraggable: function setDraggable(draggable) {
            this._setItemInfoPreferences('draggable', draggable);
        },

        /**
         * Set resizable
         * @memberOf WidgetModel
         * @param {boolean} resizable
         */
        setResizable: function setResizable(resizable) {
            this._setItemInfoPreferences('resizable', resizable);
        },

        /**
         * Set freeze
         * @memberOf WidgetModel
         * @param {boolean} freeze
         */
        setFreeze: function setFreeze(freeze) {
            this._setItemInfoPreferences('freeze', freeze);
        },

        /**
         * Set expandable
         * @memberOf WidgetModel
         * @param {boolean} expandable
         */
        setExpandable: function setExpandable(expandable) {

            this._setItemInfoPreferences('expandable', expandable);

            /**
             * Get scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.toggleContentExpander,
                expandable
            );
        },

        /**
         * Set scrollable
         * @memberOf WidgetModel
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
        },

        /**
         * Set commentable
         * @memberOf WidgetModel
         * @param {boolean} commentable
         */
        setCommentable: function setCommentable(commentable) {

            this._setItemInfoPreferences('commentable', commentable);

            /**
             * Get scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.commentableContent,
                commentable
            );
        },

        /**
         * Set custom class name
         * @memberOf WidgetModel
         * @param {string} name
         */
        setCustomClassName: function setCustomClassName(name) {

            /**
             * Get current class name
             * @type {string}
             */
            var currentClassName = this.getConfig('preferences').customClassName;

            this._setItemInfoPreferences('customClassName', name);

            /**
             * Get scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.customClassName,
                [name, currentClassName]
            );
        },

        /**
         * Set hide Content On Drag
         * @memberOf WidgetModel
         * @param {boolean} hide
         */
        setHideContentOnDrag: function setHideContentOnDrag(hide) {
            this._setItemInfoPreferences('hideContentOnDrag', hide);
        },

        /**
         * Set hide Content On resize
         * @memberOf WidgetModel
         * @param {boolean} hide
         */
        setHideContentOnResize: function setHideContentOnResize(hide) {
            this._setItemInfoPreferences('hideContentOnResize', hide);
        },

        /**
         * Set outline to page containment
         * @memberOf WidgetModel
         * @param {boolean} outline
         */
        setPageContainment: function setPageContainment(outline) {

            this._setItemInfoPreferences('pageContainment', outline);

            /**
             * Get scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.updateContainment, [
                    ['draggable', 'resizable'],
                    containment
                ]
            );
        }

    }, BaseModel.prototype);
});