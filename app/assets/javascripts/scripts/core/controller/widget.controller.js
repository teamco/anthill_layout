/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'jquery.ui',
        'config/anthill',
        'modules/Controller',
        'controller/widget/widget.interactions',
        'controller/widget/widget.maximize',
        'controller/widget/widget.stretch',
        'controller/widget/widget.content'
    ],

    /**
     * Define widget controller
     * @param ui
     * @param {AntHill} AntHill
     * @param {BaseController} BaseController
     * @param {WidgetInteractions} WidgetInteractions
     * @param {WidgetContent} WidgetContent
     * @param {WidgetStretch} WidgetStretch
     * @param {WidgetMaximize} WidgetMaximize
     * @returns {*}
     */
        function defineWidgetController(ui, AntHill, BaseController, WidgetInteractions, WidgetMaximize, WidgetStretch, WidgetContent) {

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
                 * @member WidgetController
                 * @returns {*|jQuery}
                 */
                get$page: function get$page() {
                    return this.getContainment().view.elements.$page;
                },

                /**
                 * Get page layout
                 * @member WidgetController
                 * @returns {Layout}
                 */
                getPageLayout: function getPageLayout() {
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
                            this.getPageLayout().controller.getBehavior()
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
                        layout = this.getPageLayout(),
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
                 * Save widget DOM
                 * @member WidgetController
                 */
                saveDom: function saveDom() {
                    this.logger.debug(this.i18n.t('save.widget'));
                    this.model.defineDOM();
                },

                /**
                 * Load config preferences
                 * @member WidgetController
                 */
                loadPreferences: function loadPreferences() {

                    /**
                     * Get preferences
                     * @type {{}}
                     */
                    var prefs = this.model.getConfig('preferences');

                    $.each(prefs, function each(index, value) {

                        /**
                         * Define method name
                         * @type {string}
                         */
                        var setter = 'set' + index.toCamel().capitalize();

                        if (typeof(this.model[setter]) === 'function') {

                            this.model[setter](value);

                        } else {

                            this.logger.debug('Skip', setter);
                        }

                    }.bind(this));
                }
            },

            AntHill.prototype,
            BaseController.prototype,
            WidgetContent.prototype,
            WidgetMaximize.prototype,
            WidgetStretch.prototype,
            WidgetInteractions.prototype
        );
    }
);