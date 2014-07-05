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
         * Set content preferences
         * @member WidgetModel
         * @param {string} eventName
         */
        setContentPreferences: function setContentPreferences(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            /**
             * Get content
             * @type {WidgetContent}
             */
            var content = scope.content;

            if (typeof(content.model[eventName]) === 'function') {

                content.model[eventName](eventName);

            } else {

                scope.logger.warn('Skip', eventName);
            }
        },

        /**
         * Set layer
         * @member WidgetModel
         * @param {string} eventName
         */
        setLayer: function setLayer(eventName) {
            this.setContentPreferences(eventName);
        },

        /**
         * Set stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStick: function setStick(eventName) {
            this.setContentPreferences(eventName);
        }

    }, BaseModel.prototype);
});