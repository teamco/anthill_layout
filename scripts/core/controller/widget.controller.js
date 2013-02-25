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
         * Get widgets container
         * @returns {*}
         */
        getContainer: function getContainer() {
            return this.getPage().view.elements.$widgets;
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
         */
        dragOn: function dragOn(type) {
            this.logger.debug('On drag', arguments);
            this.controller.behaviorMode({
                organize: false,
                animate: false,
                type: type,
                $source: this.wireframe.$
            });
        },
        /**
         * Stop drag
         * @param {String} type
         */
        dragStop: function dragStop(type) {
            this.logger.debug('Stop drag', arguments);
            this.controller.behaviorMode({
                organize: false,
                animate: true,
                type: type,
                $source: this.view.elements.$widget.$
            });
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
            this.controller.behaviorMode({
                organize: false,
                animate: false,
                type: type,
                $source: this.wireframe.$
            });
        },
        /**
         * Resize stop
         * @param {String} type
         * @param {Boolean} animate
         * @param {Boolean} organize
         */
        resizeStop: function resizeStop(type, organize, animate) {
            this.logger.debug('Stop resize', arguments);
            this.controller.behaviorMode({
                organize: organize,
                animate: animate,
                type: type,
                $source: this.view.elements.$widget.$
            });
        },
        /**
         * Behavior mode
         * @param {{
         *      organize: Boolean,
         *      animate: Boolean,
         *      type: String,
         *      $source
         * }} opts
         */
        behaviorMode: function behaviorMode(opts) {
            var page = this.getPage(),
                layout = page.controller.getLayout(),
                mode = layout.controller.getBehavior();

            switch(layout.config.mode) {
                case page.LAYOUT_MODES.freeStyle:
                    break;
                case page.LAYOUT_MODES.snap2grid:
                default:
                    this.scope.map.sticker(opts, mode);
                    break;
            }
        },
        save: function save() {
            this.logger.debug('Save widget');
            this.model.save();
        }

    }, BaseController.prototype);
});