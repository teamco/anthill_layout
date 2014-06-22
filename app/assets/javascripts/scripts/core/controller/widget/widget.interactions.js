/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/22/14
 * Time: 9:25 PM
 */

define([
    'controller/widget/widget.drag',
    'controller/widget/widget.resize'
], function defineWidgetInteractions(Draggable, Resizable){

    /**
     * Define Widget Interactions
     * @class WidgetInteractions
     * @constructor
     */
    var WidgetInteractions = function WidgetInteractions() {

    };

    return WidgetInteractions.extend('WidgetInteractions', {

        /**
         * Setup interactions {Drag|Resize}
         * @member WidgetInteractions
         */
        setupInteractions: function setupInteractions() {

            var scope = this.scope,
                observer = scope.observer,
                eventList = scope.eventmanager.eventList;

            observer.publish(eventList.initDraggable);
            observer.publish(eventList.initResizable);
        },

        /**
         * Init drag
         * @member WidgetInteractions
         */
        initDraggable: function initDraggable() {
            this.controller.setInteraction(Draggable);
        },

        /**
         * Enable drag
         * @member WidgetInteractions
         */
        enableDraggable: function enableDraggable() {
            this.interactions.draggable.enable();
        },

        /**
         * Disable drag
         * @member WidgetInteractions
         */
        disableDraggable: function disableDraggable() {
            this.interactions.draggable.disable();
        },

        /**
         * Destroy drag
         * @member WidgetInteractions
         */
        destroyDraggable: function destroyDraggable() {
            this.interactions.draggable.destroy();
        },

        /**
         * Init resize
         * @member WidgetInteractions
         */
        initResizable: function initResizable() {
            this.controller.setInteraction(Resizable);
        },

        /**
         * Enable resize
         * @member WidgetInteractions
         */
        enableResizable: function enableResizable() {
            this.interactions.resizable.enable();
        },

        /**
         * Disable resize
         * @member WidgetInteractions
         */
        disableResizable: function disableResizable() {
            this.interactions.resizable.disable();
        },

        /**
         * Destroy resize
         * @member WidgetInteractions
         */
        destroyResizable: function destroyResizable() {
            this.interactions.resizable.destroy();
        },

        /**
         * Debug interactions
         * @member WidgetInteractions
         * @param {String} interaction
         */
        debugInteractions: function debugInteractions(interaction) {
            this.logger.debug('Debug interactions', interaction);
        },

        /**
         * Create drag
         * @member WidgetInteractions
         */
        createDraggable: function createDraggable() {
            this.logger.debug('Create drag', arguments);
        },

        /**
         * Start drag
         * @member WidgetInteractions
         */
        startDraggable: function startDraggable() {
            this.logger.debug('Start drag', arguments);
        },

        /**
         * Grid sticker on drag
         * @member WidgetInteractions
         * @param {String} type
         */
        dragDraggable: function dragDraggable(type) {

            this.logger.debug('On drag', arguments);

            this.map.selectOverlappedWidgets();

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('ongoing'),
                type
            );
        },

        /**
         * Stop drag
         * @member WidgetInteractions
         * @param {String} type
         */
        stopDraggable: function stopDraggable(type) {

            this.logger.debug('Stop drag', arguments);

            this.map.unSelectOverlappedWidgets();

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('stop'),
                type
            );
        },

        /**
         * Create resize
         * @member WidgetInteractions
         * @param {String} type
         */
        createResizable: function createResizable(type) {
            this.logger.debug('Create resize', arguments);
        },

        /**
         * Resize start
         * @member WidgetInteractions
         * @param {String} type
         */
        startResizable: function startResizable(type) {
            this.logger.debug('Start resize', arguments);
        },

        /**
         * Grid sticker on resize
         * @member WidgetInteractions
         * @param {String} type
         */
        resizeResizable: function resizeResizable(type) {

            this.logger.debug('On resize', arguments);

            this.map.selectOverlappedWidgets();

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('ongoing'),
                type
            );
        },

        /**
         * Resize stop
         * @member WidgetInteractions
         * @param {String} type
         * @param {{}} [opts]
         * @param [args]
         */
        stopResizable: function stopResizable(type, opts, args) {

            this.logger.debug('Stop resize', arguments);

            this.map.unSelectOverlappedWidgets();

            /**
             * Define opts
             * @type {*}
             */
            opts = this.base.define(opts, {}, true);

            /**
             * Define controller
             * @type {WidgetInteractions}
             */
            var controller = this.controller;

            /**
             * Get config
             * @type {*|{organize: Boolean, animate: Boolean, callback?: Function, $source}}
             */
            var config = controller.getInteractionConfig('stop');

            /**
             * Define organize
             * @type {boolean}
             */
            config.organize = this.base.defineBoolean(
                opts.organize,
                config.organize,
                true
            );

            /**
             * Define animate
             * @type {boolean}
             */
            config.animate = this.base.defineBoolean(
                opts.animate,
                config.animate,
                true
            );

            controller.behaviorMode(config, type);
        },

        /**
         * Update Resizable
         * @member WidgetInteractions
         * @param key
         * @param value
         */
        updateResizable: function updateResizable(key, value) {
            this.updateInteractions('resizable', key, value);
        },

        /**
         * Update Draggable
         * @member WidgetInteractions
         * @param key
         * @param value
         */
        updateDraggable: function updateDraggable(key, value) {
            this.updateInteractions('draggable', key, value);
        },

        /**
         * Update interactions
         * @member WidgetInteractions
         * @param type
         * @param key
         * @param value
         */
        updateInteractions: function updateInteractions(type, key, value) {
            this.scope.view.get$item().$[type]('option', key, value);
        },

        /**
         * Check if widget is draggable
         * @member WidgetInteractions
         * @returns {Boolean}
         */
        isDraggable: function isDraggable() {
            return this.scope.view.get$item().$.is('.ui-draggable');
        },

        /**
         * Check if widget is resizable
         * @member WidgetInteractions
         * @returns {Boolean}
         */
        isResizable: function isResizable() {
            return this.scope.view.get$item().$.is('.ui-resizable');
        }
    });
});