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
         * Get page jquery object
         * @returns {*}
         */
        get$page: function get$page() {
            return this.getParent().view.elements.$page.$;
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
            this.interactions.resizable.enable();
        },
        /**
         * Disable resize
         */
        disableResize: function disableResize() {
            this.interactions.resizable.disable();
        },
        /**
         * Destroy resize
         */
        destroyResize: function destroyResize() {
            this.interactions.resizable.destroy();
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
            this.controller.getParent().controller.downgradeLayer(this);
            this.controller.behaviorMode({
                organize: false,
                animate: true,
                type: type,
                $source: this.view.elements.$widget.$,
                callback: this.controller._resetInteractions.bind(this.controller)
            });
        },

        /**
         * Create resize
         * @param {String} type
         */
        resizeCreate: function resizeCreate(type) {
            this.logger.debug('Create resize', arguments);
        },

        /**
         * Resize start
         * @param {String} type
         */
        resizeStart: function resizeStart(type) {
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

//            this.view.elements.$content.demo();
        },

        /**
         * Resize stop
         * @param {String} type
         * @param {Boolean} animate
         * @param {Boolean} organize
         */
        resizeStop: function resizeStop(type, organize, animate) {
            this.logger.debug('Stop resize', arguments);
            this.controller.getParent().controller.downgradeLayer(this);
            this.controller.behaviorMode({
                organize: organize,
                animate: animate,
                type: type,
                $source: this.view.elements.$widget.$,
                callback: this.controller._resetInteractions.bind(this.controller)
            });
        },

        /**
         * Reset interactions on resize template
         * @private
         */
        _resetInteractions: function _resetInteractions() {
            $.each(this._getTemplateItems(), function each(uuid, widget) {
                widget.api.destroyResize();
                widget.api.destroyDrag();
                widget.api.initResize();
                widget.api.initDrag();
            });
        },

        /**
         * Get items from template widget and run callback
         * @private
         */
        _getTemplateItems: function _getTemplateItems() {
            return this.isTemplate() ?
                this.getParent().template.page.items || {} : {};
        },

        /**
         * Check if widget is draggable
         * @returns {Boolean}
         */
        isDraggable: function isDraggable() {
            return this.scope.view.elements.$widget.$.is('.ui-draggable');
        },

        /**
         * Check if widget is resizable
         * @returns {Boolean}
         */
        isResizable: function isResizable() {
            return this.scope.view.elements.$widget.$.is('.ui-resizable');
        },

        /**
         * Check if widget is template
         * @returns {Boolean}
         */
        isTemplate: function isTemplate() {
            var scope = this.scope;
            return scope.config.type ===
                this.getParent().model.getConfig(
                    scope.constructor.name.toLowerCase()
                ).types.template;
        },

        /**
         * Behavior mode
         * @param {{
         *      organize: Boolean,
         *      animate: Boolean,
         *      type: String,
         *      [callback]: Function,
         *      $source
         * }} opts
         */
        behaviorMode: function behaviorMode(opts) {
            var scope = this.scope,
                page = this.getParent(),
                layout = page.controller.getLayout(),
                mode = layout.controller.getBehavior();

            switch (layout.config.mode) {
                case page.LAYOUT_MODES.freeStyle:
                    break;
                case page.LAYOUT_MODES.snap2grid:
                    scope.model.save();
                    scope.map.sticker(opts, mode);
                    break;
                default:
                    break;
            }
        },
        save: function save() {
            this.logger.debug('Save widget');
            this.model.save();
        }

    }, BaseController.prototype);
});