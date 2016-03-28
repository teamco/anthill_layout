/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'config/anthill',
        'modules/Controller',
        'controller/widget/widget.interactions',
        'controller/widget/widget.maximize',
        'controller/widget/widget.zoom',
        'controller/widget/widget.stretch',
        'controller/widget/widget.stick',
        'controller/widget/widget.layer',
        'controller/widget/widget.content'
    ],

    /**
     * Define widget controller
     * @param {AntHill} AntHill
     * @param {BaseController} BaseController
     * @param {WidgetInteractions} WidgetInteractions
     * @param {WidgetContent} WidgetContent
     * @param {WidgetStretch} WidgetStretch
     * @param {WidgetStick} WidgetStick
     * @param {WidgetLayer} WidgetLayer
     * @param {WidgetMaximize} WidgetMaximize
     * @param {WidgetZoom} WidgetZoom
     * @returns {*}
     */
    function defineWidgetController(AntHill, BaseController, WidgetInteractions, WidgetMaximize, WidgetZoom, WidgetStretch, WidgetStick, WidgetLayer, WidgetContent) {

        /**
         * Define widget controller
         * @class WidgetController
         * @extends AntHill
         * @extends BaseController
         * @extends WidgetInteractions
         * @extends WidgetContent
         * @extends WidgetStretch
         * @extends WidgetStick
         * @extends WidgetLayer
         * @extends WidgetMaximize
         * @extends WidgetZoom
         * @constructor
         */
        var WidgetController = function WidgetController() {
        };

        return WidgetController.extend('WidgetController', {

                /**
                 * Get config
                 * @memberOf WidgetController
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
                             *      $source: ($|*|Element.$)
                             * }}
                             */
                            config = {
                                animate: true,
                                organize: true,
                                $source: this.scope.view.get$item().$
                            };
                            break;
                    }

                    return config;
                },

                /**
                 * Get page jquery object
                 * @memberOf WidgetController
                 * @returns {*|jQuery}
                 */
                get$page: function get$page() {
                    return this.getContainment().view.elements.$page;
                },

                /**
                 * Get page layout
                 * @memberOf WidgetController
                 * @returns {Layout}
                 */
                getPageLayout: function getPageLayout() {
                    return this.getContainment().controller.getLayout();
                },

                /**
                 * Get merged local padding from widget dom
                 * @memberOf WidgetController
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
                 * @memberOf WidgetController
                 * @returns {{top: number, right: number, bottom: number, left: number}}
                 */
                getGlobalPadding: function getGlobalPadding() {

                    /**
                     * Get layout
                     * @type {Layout}
                     */
                    var layout = this.getPageLayout();

                    /**
                     * Get padding
                     * @type {{top: number, right: number, bottom: number, left: number}|*}
                     */
                    var padding = layout.config.grid.padding;

                    this.scope.logger.debug('Get global padding', padding);

                    return padding;
                },

                /**
                 * Define custom class name
                 * @memberOf WidgetController
                 * @param {string} name
                 * @param {string} previous
                 */
                customClassName: function customClassName(name, previous) {

                    /**
                     * Get $widget
                     * @type {WidgetElement}
                     */
                    var $widget = this.view.get$item();

                    $widget.$.removeClass(previous);

                    if (name && name.length > 0) {
                        $widget.$.addClass(name);
                    }
                },

                /**
                 * Behavior mode
                 * @memberOf WidgetController
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
                     * @type {string}
                     */
                    var mode = this.isMode();

                    /**
                     * Set event type
                     * @type {String}
                     */
                    opts.type = type;

                    if (mode && _.isFunction(this[mode + 'Mode'])) {
                        this[mode + 'Mode'](
                            opts,
                            mode,
                            this.getPageLayout().controller.getBehavior()
                        );
                    }
                },

                /**
                 * Define snap2grid mode
                 * @memberOf WidgetController
                 * @param opts
                 * @param mode
                 * @param behavior
                 */
                jqUIGridMode: function jqUIGridMode(opts, mode, behavior) {
                    this.scope.wireframe.hide();
                    this.scope.map.sticker(opts, mode, behavior);
                },

                /**
                 * Define free style mode
                 * @memberOf WidgetController
                 * @param opts
                 * @param mode
                 * @param behavior
                 */
                freeStyleMode: function freeStyleMode(opts, mode, behavior) {
                    // TODO
                },

                /**
                 * Define snap2grid mode
                 * @memberOf WidgetController
                 * @param opts
                 * @param mode
                 * @param behavior
                 */
                snap2gridMode: function snap2gridMode(opts, mode, behavior) {
                    this.scope.map.sticker(opts, mode, behavior);
                },

                /**
                 * Check behavior mode
                 * @memberOf WidgetController
                 * @returns {string|undefined}
                 */
                isMode: function isMode() {

                    var modes = this.getContainment().LAYOUT_MODES,
                        layout = this.getPageLayout(),
                        mode = layout.config.mode;

                    return modes[mode];
                },

                /**
                 * Save widget DOM
                 * @memberOf WidgetController
                 */
                saveDom: function saveDom() {
                    this.logger.debug(this.i18n.t('save.widget'));
                    this.model.defineDOM();
                }
            },

            AntHill.prototype,
            BaseController.prototype,
            WidgetContent.prototype,
            WidgetMaximize.prototype,
            WidgetZoom.prototype,
            WidgetStretch.prototype,
            WidgetStick.prototype,
            WidgetLayer.prototype,
            WidgetInteractions.prototype
        );
    }
);