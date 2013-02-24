/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/controller',
    'controller/widget/widget.drag',
    'controller/widget/widget.resize'
], function defineWidgetController(BaseController, Drag, Resize) {
    var Controller = function Controller() {
    };

    return Controller.extend({
        /**
         * Get page instance
         * @returns {*}
         */
        getPage: function getPage() {
            return this.scope.config.parent;
        },
        /**
         * Get page jquery object
         * @returns {*}
         */
        get$page: function get$page() {
            return this.getPage().view.elements.$page.$;
        },
        /**
         * Setup interactions {Drag|Resize}
         */
        setupInteractions: function setupInteractions() {
            var scope = this.scope;
            scope.observer.publish(scope.eventmanager.eventList.initDrag);
            scope.observer.publish(scope.eventmanager.eventList.initResize);
        },
        /**
         * Init drag
         */
        initDrag: function initDrag() {
            this.controller.setInteraction('draggable', new Drag(this));
        },
        /**
         * Enable drag
         */
        enableDrag: function enableDrag() {
            this.interactions.draggable.enable();
        },
        /**
         * Disable drag
         */
        disableDrag: function disableDrag() {
            this.interactions.draggable.disable();
        },
        /**
         * Destroy drag
         */
        destroyDrag: function destroyDrag() {
            this.interactions.draggable.destroy();
        },
        /**
         * Init resize
         */
        initResize: function initResize() {
            this.controller.setInteraction('resizable', new Resize(this));
        },
        /**
         * Enable resize
         */
        enableResize: function enableResize() {
            this.interactions.draggable.enable();
        },
        /**
         * Disable resize
         */
        disableResize: function disableResize() {
            this.interactions.draggable.disable();
        },
        /**
         * Destroy resize
         */
        destroyResize: function destroyResize() {
            this.interactions.draggable.destroy();
        },
        /**
         * Debug interactions
         * @param {String} interaction
         */
        debugInteractions: function debugInteractions(interaction) {
            this.logger.debug('Debug interactions', interaction);
        },
        /**
         * Create drag
         */
        dragCreate: function dragCreate() {
            this.logger.debug('Create drag', arguments);
        },
        /**
         * Start drag
         */
        dragStart: function dragStart() {
            this.logger.debug('Start drag', arguments);
        },
        /**
         * Grid sticker on drag
         * @param {String} type
         * @param {Boolean} animate
         */
        dragSticker: function dragSticker(type, animate) {
            this.logger.debug('On drag', arguments);
            this.map.sticker({
                organize: false,
                animate: false,
                type: type,
                $source: this.wireframe.$
            });
        },
        /**
         * Stop drag
         */
        dragStop: function dragStop() {
            this.logger.debug('Stop drag', arguments);
        },
        /**
         * Create resize
         */
        resizeCreate: function resizeCreate() {
            this.logger.debug('Create resize', arguments);
        },
        /**
         * Resize start
         */
        resizeStart: function resizeStart() {
            this.logger.debug('Start resize', arguments);
        },
        /**
         * Grid sticker on resize
         * @param {String} type
         * @param {Boolean} animate
         */
        resizeSticker: function resizeSticker(type, animate) {
            this.logger.debug('On resize', arguments);
            this.map.sticker({
                organize: false,
                animate: false,
                type: type,
                $source: this.wireframe.$
            });
        },
        /**
         * Resize stop
         */
        resizeStop: function resizeStop() {
            this.logger.debug('Stop resize', arguments);
        }

    }, BaseController.prototype);
});