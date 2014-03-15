/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/controller',
    'controller/widget/widget.drag',
    'controller/widget/widget.resize',
    'controller/widget/widget.content'
], function defineWidgetController(AntHill, BaseController, Drag, Resize, Content) {

    /**
     * Define widget controller
     * @class Controller
     * @extends AntHill
     * @extends BaseController
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend('Controller', {

        /**
         * Get config
         * @member Controller
         * @param {string} type
         * @returns {*|{
         *      animate: Boolean,
         *      organize: Boolean,
         *      [callback]: Function,
         *      $source
         * }}
         */
        getInteractionConfig: function getInteractionConfig(type) {

            /**
             * Init config
             * @type {*}
             */
            var config = {};

            switch (type) {

                case 'ongoing':

                    /**
                     * Set config
                     * @type {{
                     *      animate: boolean,
                     *      organize: boolean,
                     *      $source: ($|*|Element.$)
                     * }}
                     */
                    config = {
                        animate: false,
                        organize: true,
                        $source: this.scope.wireframe.$
                    };
                    break;

                case 'stop':

                    /**
                     * Set config
                     * @type {{
                     *      animate: boolean,
                     *      organize: boolean,
                     *      $source: ($|*|Element.$),
                     *      callback: (function(this:BaseController)|*)
                     * }}
                     */
                    config = {
                        animate: true,
                        organize: true,
                        $source: this.scope.view.get$item().$,
                        callback: this._resetInteractions.bind(this)
                    };
                    break;
            }

            return config;
        },

        /**
         * Get page jquery object
         * @member Controller
         * @returns {*|jQuery}
         */
        get$page: function get$page() {
            return this.getContainment().view.elements.$page;
        },

        /**
         * Get layout
         * @member Controller
         * @returns {*}
         */
        getLayout: function getLayout() {
            return this.getContainment().controller.getLayout();
        },

        /**
         * Get merged local padding from widget dom
         * @member Controller
         * @returns {{top: number, right: number, bottom: number, left: number}|*}
         */
        getLocalPadding: function getLocalPadding() {
            var padding = {},
                global = this.getGlobalPadding(),
                local = this.base.define(this.scope.dom.padding, {}, true);

            this.scope.logger.debug(
                'Merge local padding',
                $.extend(padding, global, local)
            );

            return padding;
        },

        /**
         * Get global padding from layout config
         * @member Controller
         * @returns {{top: number, right: number, bottom: number, left: number}}
         */
        getGlobalPadding: function getGlobalPadding() {

            /**
             * Get layout
             * @type {*}
             */
            var layout = this.getContainment().controller.getLayout();

            /**
             * Get padding
             * @type {{top: number, right: number, bottom: number, left: number}|*}
             */
            var padding = layout.config.grid.padding;

            this.scope.logger.debug('Get global padding', padding);

            return padding;
        },

        /**
         * Setup interactions {Drag|Resize}
         * @member Controller
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
         * @member Controller
         */
        initDraggable: function initDraggable() {
            this.controller.setInteraction(
                'draggable',
                new Drag(this)
            );
        },

        /**
         * Enable drag
         * @member Controller
         */
        enableDraggable: function enableDraggable() {
            this.interactions.draggable.enable();
        },

        /**
         * Disable drag
         * @member Controller
         */
        disableDraggable: function disableDraggable() {
            this.interactions.draggable.disable();
        },

        /**
         * Destroy drag
         * @member Controller
         */
        destroyDraggable: function destroyDraggable() {
            this.interactions.draggable.destroy();
        },

        /**
         * Init resize
         * @member Controller
         */
        initResizable: function initResizable() {
            this.controller.setInteraction(
                'resizable',
                new Resize(this)
            );
        },

        /**
         * Enable resize
         * @member Controller
         */
        enableResizable: function enableResizable() {
            this.interactions.resizable.enable();
        },

        /**
         * Disable resize
         * @member Controller
         */
        disableResizable: function disableResizable() {
            this.interactions.resizable.disable();
        },

        /**
         * Destroy resize
         * @member Controller
         */
        destroyResizable: function destroyResizable() {
            this.interactions.resizable.destroy();
        },

        /**
         * Debug interactions
         * @member Controller
         * @param {String} interaction
         */
        debugInteractions: function debugInteractions(interaction) {
            this.logger.debug('Debug interactions', interaction);
        },

        /**
         * Create drag
         * @member Controller
         */
        createDraggable: function createDraggable() {
            this.logger.debug('Create drag', arguments);
        },

        /**
         * Start drag
         * @member Controller
         */
        startDraggable: function startDraggable() {
            this.logger.debug('Start drag', arguments);

            this.controller.get$page().hideItemsContent();
        },

        /**
         * Grid sticker on drag
         * @member Controller
         * @param {String} type
         */
        dragDraggable: function dragDraggable(type) {

            this.logger.debug('On drag', arguments);

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('ongoing'),
                type
            );
        },

        /**
         * Stop drag
         * @member Controller
         * @param {String} type
         */
        stopDraggable: function stopDraggable(type) {

            this.logger.debug('Stop drag', arguments);

            this.controller.getContainment().controller.downgradeLayer(this);

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('stop'),
                type
            );

            this.controller.get$page().showItemsContent();
        },

        /**
         * Create resize
         * @member Controller
         * @param {String} type
         */
        createResizable: function createResizable(type) {
            this.logger.debug('Create resize', arguments);
        },

        /**
         * Resize start
         * @member Controller
         * @param {String} type
         */
        startResizable: function startResizable(type) {
            this.logger.debug('Start resize', arguments);

            this.controller.get$page().hideItemsContent();
        },

        /**
         * Grid sticker on resize
         * @member Controller
         * @param {String} type
         */
        resizeResizable: function resizeResizable(type) {
            this.logger.debug('On resize', arguments);

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('ongoing'),
                type
            );
        },

        /**
         * Resize stop
         * @member Controller
         * @param {String} type
         * @param {{}} [opts]
         * @param [args]
         */
        stopResizable: function stopResizable(type, opts, args) {

            this.logger.debug('Stop resize', arguments);

            /**
             * Define opts
             * @type {*}
             */
            opts = this.base.define(opts, {}, true);

            /**
             * Define controller
             * @type {controller|*}
             */
            var controller = this.controller;

            controller.getContainment().controller.downgradeLayer(this);

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

            controller.get$page().showItemsContent();
        },

        /**
         * Update Resizable
         * @member Controller
         * @param key
         * @param value
         */
        updateResizable: function updateResizable(key, value) {
            this.updateInteractions('resizable', key, value);
        },

        /**
         * Update Draggable
         * @member Controller
         * @param key
         * @param value
         */
        updateDraggable: function updateDraggable(key, value) {
            this.updateInteractions('draggable', key, value);
        },

        /**
         * Update interactions
         * @member Controller
         * @param type
         * @param key
         * @param value
         */
        updateInteractions: function updateInteractions(type, key, value) {
            this.scope.view.get$item().$[type]('option', key, value);
        },

        /**
         * Reset interactions on resize template
         * @member Controller
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
         * @member Controller
         * @private
         */
        _getTemplateItems: function _getTemplateItems() {
            return this.isTemplate() ?
                this.getContainment().template.page.items || {} : {};
        },

        /**
         * Check if widget is draggable
         * @member Controller
         * @returns {Boolean}
         */
        isDraggable: function isDraggable() {
            return this.scope.view.get$item().$.is('.ui-draggable');
        },

        /**
         * Check if widget is resizable
         * @member Controller
         * @returns {Boolean}
         */
        isResizable: function isResizable() {
            return this.scope.view.get$item().$.is('.ui-resizable');
        },

        /**
         * Check if widget is template
         * @member Controller
         * @returns {Boolean}
         */
        isTemplate: function isTemplate() {

            var scope = this.scope;

            return scope.config.type ===
                this.getContainment().model.getConfig(
                    scope.constructor.name.toLowerCase()
                ).types.template;
        },

        /**
         * Behavior mode
         * @member Controller
         * @param {{
         *      animate: Boolean,
         *      [callback]: Function,
         *      [type]: String
         *      $source
         * }} opts
         * @param {String} type
         */
        behaviorMode: function behaviorMode(opts, type) {

            /**
             * Check if mod
             * @type {boolean}
             */
            var mode = this.isMode();

            /**
             * Set event type
             * @type {String}
             */
            opts.type = type;

            if (mode && this.base.isFunction(this[mode + 'Mode'])) {
                this[mode + 'Mode'](
                    opts,
                    mode,
                    this.getLayout().controller.getBehavior()
                );
            }
        },

        /**
         * Define snap2grid mode
         * @member Controller
         * @param opts
         * @param mode
         * @param behavior
         */
        jqUIGridMode: function jqUIGridMode(opts, mode, behavior) {
            this.scope.wireframe.hide();
            this.scope.map.sticker(opts, mode, behavior);
        },

        /**
         * Define snap2grid mode
         * @member Controller
         * @param opts
         * @param mode
         * @param behavior
         */
        freeStyleMode: function freeStyleMode(opts, mode, behavior) {

        },

        /**
         * Define snap2grid mode
         * @member Controller
         * @param opts
         * @param mode
         * @param behavior
         */
        snap2gridMode: function snap2gridMode(opts, mode, behavior) {
            this.scope.map.sticker(opts, mode, behavior);
        },

        /**
         * Check behavior mode
         * @member Controller
         * @returns {boolean}
         */
        isMode: function isMode() {

            var modes = this.getContainment().LAYOUT_MODES,
                layout = this.getLayout(),
                mode = layout.config.mode,
                index;

            for (index in modes) {

                if (modes.hasOwnProperty(index)) {
                    if (mode === modes[index]) {
                        return mode;
                    }
                }
            }

            return false;
        },

        /**
         * Adopt widget dimension on resize page
         * @member Controller
         * @param {Boolean} animate
         */
        adoptDimensions: function adoptDimensions(animate) {
            this.map.adoptTo(animate);
        },

        /**
         * Save widget DOM
         * @member Controller
         */
        saveDOM: function saveDOM() {
            this.logger.debug(this.i18n.t('save.widget'));
            this.model.defineDOM();
        }

    }, AntHill.prototype, BaseController.prototype, Content.prototype);
});