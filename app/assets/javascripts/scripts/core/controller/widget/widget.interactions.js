/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/22/14
 * Time: 9:25 PM
 */

define([
    'controller/widget/widget.drag',
    'controller/widget/widget.resize'
], function defineWidgetInteractions(Draggable, Resizable) {

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
         * @memberOf WidgetInteractions
         */
        setupInteractions: function setupInteractions() {

            var scope = this.scope,
                observer = scope.observer,
                eventList = scope.eventmanager.eventList;

            observer.publish(eventList.initDraggable);
            observer.publish(eventList.initResizable);
        },

        /**
         * Set Interaction
         * @memberOf WidgetInteractions
         * @param {Function|Resizable|Draggable|Droppable} InteractionEvent
         * @returns {*}
         */
        setInteraction: function setInteraction(InteractionEvent) {

            /**
             * Event name
             * @type {string}
             */
            var ename = InteractionEvent.name.toLowerCase();

            /**
             * Get scope
             * @type {Widget}
             */
            var scope = this.scope;

            /**
             * Register interactions
             * @type {Draggable|Resizable|Droppable}
             */
            scope.interactions[ename] = new InteractionEvent(scope);

            return this.getInteraction(ename);
        },

        /**
         * Get Interaction
         * @memberOf WidgetInteractions
         * @param {String} event
         * @returns {*}
         */
        getInteraction: function getInteraction(event) {
            return this.scope.interactions[event];
        },

        /**
         * Init drag
         * @memberOf WidgetInteractions
         */
        initDraggable: function initDraggable() {
            this.controller.setInteraction(Draggable);
        },

        /**
         * Enable drag
         * @memberOf WidgetInteractions
         */
        enableDraggable: function enableDraggable() {
            this.interactions.draggable.enable();
        },

        /**
         * Disable drag
         * @memberOf WidgetInteractions
         */
        disableDraggable: function disableDraggable() {
            this.interactions.draggable.disable();
        },

        /**
         * Destroy drag
         * @memberOf WidgetInteractions
         */
        destroyDraggable: function destroyDraggable() {
            this.interactions.draggable.destroy();
        },

        /**
         * Init resize
         * @memberOf WidgetInteractions
         */
        initResizable: function initResizable() {
            this.controller.setInteraction(Resizable);
        },

        /**
         * Enable resize
         * @memberOf WidgetInteractions
         */
        enableResizable: function enableResizable() {
            this.interactions.resizable.enable();
        },

        /**
         * Disable resize
         * @memberOf WidgetInteractions
         */
        disableResizable: function disableResizable() {
            this.interactions.resizable.disable();
        },

        /**
         * Destroy resize
         * @memberOf WidgetInteractions
         */
        destroyResizable: function destroyResizable() {
            this.interactions.resizable.destroy();
        },

        /**
         * Debug interactions
         * @memberOf WidgetInteractions
         * @param {String} interaction
         */
        debugInteractions: function debugInteractions(interaction) {
            this.logger.debug('Debug interactions', interaction);
        },

        /**
         * Create drag
         * @memberOf WidgetInteractions
         */
        createDraggable: function createDraggable() {
            this.logger.debug('Create drag', arguments);
        },

        /**
         * Start drag
         * @memberOf WidgetInteractions
         */
        startDraggable: function startDraggable() {
            this.logger.debug('Start drag', arguments);
        },

        /**
         * Grid sticker on drag
         * @memberOf WidgetInteractions
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
         * @memberOf WidgetInteractions
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
         * @memberOf WidgetInteractions
         * @param {String} type
         */
        createResizable: function createResizable(type) {
            this.logger.debug('Create resize', arguments);
        },

        /**
         * Resize start
         * @memberOf WidgetInteractions
         * @param {String} type
         */
        startResizable: function startResizable(type) {
            this.logger.debug('Start resize', arguments);
        },

        /**
         * Grid sticker on resize
         * @memberOf WidgetInteractions
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
         * @memberOf WidgetInteractions
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
             * @type {WidgetController}
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
         * @memberOf WidgetInteractions
         * @param key
         * @param value
         */
        updateResizable: function updateResizable(key, value) {
            this.updateInteractions('resizable', key, value);
        },

        /**
         * Update Draggable
         * @memberOf WidgetInteractions
         * @param key
         * @param value
         */
        updateDraggable: function updateDraggable(key, value) {
            this.updateInteractions('draggable', key, value);
        },

        /**
         * Update interactions
         * @memberOf WidgetInteractions
         * @param type
         * @param key
         * @param value
         */
        updateInteractions: function updateInteractions(type, key, value) {
            this.scope.view.get$item().$[type]('option', key, value);
        },

        /**
         * Check if widget is draggable
         * @memberOf WidgetInteractions
         * @returns {Boolean}
         */
        isDraggable: function isDraggable() {
            return this.scope.view.get$item().$.is('.ui-draggable');
        },

        /**
         * Check if widget is resizable
         * @memberOf WidgetInteractions
         * @returns {Boolean}
         */
        isResizable: function isResizable() {
            return this.scope.view.get$item().$.is('.ui-resizable');
        },

        /**
         * Transfer click to content
         * @memberOf WidgetController
         * @param {string} url
         */
        setOnClickUrl: function setOnClickUrl(url) {

            if (!this.base.isUrl(url) && url.length > 0) {
                this.logger.warn('None valid url', url);
                return false;
            }

            if (url.length > 0) {
                this.view.get$item().bindOnClickOpenUrl(url);
            }
        },

        /**
         * Define update containment
         * @memberOf WidgetController
         * @param {array} types
         * @param {boolean|string|*} containment
         */
        updateContainment: function updateContainment(types, containment) {

            var i = 0, l = types.length;

            for (; i < l; i++) {

                // Get type
                var type = types[i];

                // Get interaction
                var interaction = this.interactions[type];

                if (interaction) {

                    // Update interaction
                    interaction.$scope[type](
                        'option',
                        'containment',
                        containment
                    );

                    // Update config
                    this.config.events[type].containment = !!containment;

                } else {

                    this.logger.warn('Undefined interaction', types[i]);
                }
            }

            this.logger.debug(
                'Update interaction containment',
                types,
                containment
            );
        }
    });
});