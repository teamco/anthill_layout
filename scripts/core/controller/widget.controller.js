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
], function defineWidgetController(AntHill, BaseController, Draggable, Resizable, Content) {

    /**
     * Define widget controller
     * @class WidgetController
     * @extends AntHill
     * @extends BaseController
     * @constructor
     */
    var WidgetController = function WidgetController() {
    };

    return WidgetController.extend('WidgetController', {

        /**
         * Get config
         * @member WidgetController
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
         * @member WidgetController
         * @returns {*|jQuery}
         */
        get$page: function get$page() {
            return this.getContainment().view.elements.$page;
        },

        /**
         * Get layout
         * @member WidgetController
         * @returns {*}
         */
        getLayout: function getLayout() {
            return this.getContainment().controller.getLayout();
        },

        /**
         * Get merged local padding from widget dom
         * @member WidgetController
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
         * @member WidgetController
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
         * @member WidgetController
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
         * @member WidgetController
         */
        initDraggable: function initDraggable() {
            this.controller.setInteraction(Draggable);
        },

        /**
         * Enable drag
         * @member WidgetController
         */
        enableDraggable: function enableDraggable() {
            this.interactions.draggable.enable();
        },

        /**
         * Disable drag
         * @member WidgetController
         */
        disableDraggable: function disableDraggable() {
            this.interactions.draggable.disable();
        },

        /**
         * Destroy drag
         * @member WidgetController
         */
        destroyDraggable: function destroyDraggable() {
            this.interactions.draggable.destroy();
        },

        /**
         * Init resize
         * @member WidgetController
         */
        initResizable: function initResizable() {
            this.controller.setInteraction(Resizable);
        },

        /**
         * Enable resize
         * @member WidgetController
         */
        enableResizable: function enableResizable() {
            this.interactions.resizable.enable();
        },

        /**
         * Disable resize
         * @member WidgetController
         */
        disableResizable: function disableResizable() {
            this.interactions.resizable.disable();
        },

        /**
         * Destroy resize
         * @member WidgetController
         */
        destroyResizable: function destroyResizable() {
            this.interactions.resizable.destroy();
        },

        /**
         * Debug interactions
         * @member WidgetController
         * @param {String} interaction
         */
        debugInteractions: function debugInteractions(interaction) {
            this.logger.debug('Debug interactions', interaction);
        },

        /**
         * Create drag
         * @member WidgetController
         */
        createDraggable: function createDraggable() {
            this.logger.debug('Create drag', arguments);
        },

        /**
         * Start drag
         * @member WidgetController
         */
        startDraggable: function startDraggable() {
            this.logger.debug('Start drag', arguments);
        },

        /**
         * Grid sticker on drag
         * @member WidgetController
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
         * @member WidgetController
         * @param {String} type
         */
        stopDraggable: function stopDraggable(type) {

            this.logger.debug('Stop drag', arguments);

            this.controller.getContainment().controller.downgradeLayer(this);

            this.controller.behaviorMode(
                this.controller.getInteractionConfig('stop'),
                type
            );
        },

        /**
         * Create resize
         * @member WidgetController
         * @param {String} type
         */
        createResizable: function createResizable(type) {
            this.logger.debug('Create resize', arguments);
        },

        /**
         * Resize start
         * @member WidgetController
         * @param {String} type
         */
        startResizable: function startResizable(type) {
            this.logger.debug('Start resize', arguments);
        },

        /**
         * Grid sticker on resize
         * @member WidgetController
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
         * @member WidgetController
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
             * @type {WidgetController}
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
        },

        /**
         * Update Resizable
         * @member WidgetController
         * @param key
         * @param value
         */
        updateResizable: function updateResizable(key, value) {
            this.updateInteractions('resizable', key, value);
        },

        /**
         * Update Draggable
         * @member WidgetController
         * @param key
         * @param value
         */
        updateDraggable: function updateDraggable(key, value) {
            this.updateInteractions('draggable', key, value);
        },

        /**
         * Update interactions
         * @member WidgetController
         * @param type
         * @param key
         * @param value
         */
        updateInteractions: function updateInteractions(type, key, value) {
            this.scope.view.get$item().$[type]('option', key, value);
        },

        /**
         * Reset interactions on resize template
         * @member WidgetController
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
         * @member WidgetController
         * @private
         */
        _getTemplateItems: function _getTemplateItems() {
            return this.isTemplate() ?
                this.getContainment().template.page.items || {} : {};
        },

        /**
         * Check if widget is draggable
         * @member WidgetController
         * @returns {Boolean}
         */
        isDraggable: function isDraggable() {
            return this.scope.view.get$item().$.is('.ui-draggable');
        },

        /**
         * Check if widget is resizable
         * @member WidgetController
         * @returns {Boolean}
         */
        isResizable: function isResizable() {
            return this.scope.view.get$item().$.is('.ui-resizable');
        },

        /**
         * Check if widget is template
         * @member WidgetController
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
         * @member WidgetController
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
         * @member WidgetController
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
         * @member WidgetController
         * @param opts
         * @param mode
         * @param behavior
         */
        freeStyleMode: function freeStyleMode(opts, mode, behavior) {

        },

        /**
         * Define snap2grid mode
         * @member WidgetController
         * @param opts
         * @param mode
         * @param behavior
         */
        snap2gridMode: function snap2gridMode(opts, mode, behavior) {
            this.scope.map.sticker(opts, mode, behavior);
        },

        /**
         * Check behavior mode
         * @member WidgetController
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
         * Set widget layer up
         * @member WidgetController
         */
        setLayerUp: function setLayerUp() {
            debugger
        },

        /**
         * Set widget layer down
         * @member WidgetController
         */
        setLayerDown: function setLayerDown() {
            debugger
        },

        /**
         * Set widget always on top
         * @member WidgetController
         * @param {boolean} ontop
         */
        setAlwaysOnTop: function setAlwaysOnTop(ontop) {
            this.view.get$item().moveOnTopLayer(ontop);
        },

        /**
         * Transfer click to content
         * @member WidgetController
         * @param {string} url
         */
        setOnClickUrl: function setOnClickUrl(url) {
            this.contentEvents['onClickOpenUrl'] = url;
        },

        /**
         * Clear thumbnail bg
         * @member WidgetController
         */
        clearThumbnail: function clearThumbnail() {
            this.view.get$item().clearBackground();
        },

        /**
         * Adopt widget dimension on resize page
         * @member WidgetController
         * @param {Boolean} animate
         */
        adoptDimensions: function adoptDimensions(animate) {
            this.map.adoptTo(animate);
        },

        /**
         * Get widget thumbnail
         * @member WidgetController
         * @returns {*}
         */
        getThumbnail: function getThumbnail() {
            return this.model.getConfig('preferences/thumbnail');
        },

        /**
         * Save widget DOM
         * @member WidgetController
         */
        saveDom: function saveDom() {
            this.logger.debug(this.i18n.t('save.widget'));
            this.model.defineDOM();
        }

    }, AntHill.prototype, BaseController.prototype, Content.prototype);
});