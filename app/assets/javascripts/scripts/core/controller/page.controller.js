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
        'modules/Page',
        'modules/Preferences',
        'modules/Router',
        'controller/page/page.layer',
        'controller/page/page.maximize'
    ],
    function definePageController(AntHill, BaseController, BasePage, BasePreferences, Router, PageLayer, PageMaximize) {

        /**
         * Define page controller
         * @class PageController
         * @extends BaseController
         * @extends AntHill
         * @extends BasePage
         * @extends BasePreferences
         * @extends Router
         * @extends PageLayer
         * @constructor
         */
        var PageController = function PageController() {
        };

        return PageController.extend('PageController', {

                /**
                 * Transfer preferences
                 * @member PageController
                 * @param {string} index
                 * @param value
                 */
                transferContentPreferences: function transferContentPreferences(index, value) {
                    this.logger.debug('Preferences successfully transferred', index, value);
                },

                /**
                 * Load config preferences
                 * @member PageController
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
                },

                /**
                 * Check if allowed to add widget to page
                 * @member PageController
                 * @returns {boolean}
                 */
                isAllowAddWidget: function isAllowAddWidget() {

                    /**
                     * Define allow to add widgets
                     * @type {boolean}
                     */
                    var allow = this.model.getConfig('widget/allowToAdd');
                    this.scope.logger.debug('Is allowed to add widget?', allow);

                    return allow;
                },

                /**
                 * Allow to add widget to page
                 * @member PageController
                 */
                allowAddWidget: function allowAddWidget() {
                    this.scope.logger.debug('Allow to add widget');
                    this.model.getConfig('widget').allowToAdd = true;
                },

                /**
                 * Do not allow to add widget to page
                 * @member PageController
                 */
                banAddWidget: function banAddWidget() {
                    this.scope.logger.debug('Do not allow to add widget');
                    this.model.getConfig('widget').allowToAdd = false;
                },

                /**
                 * Update layout config
                 * @member PageController
                 */
                updateLayoutConfig: function updateLayoutConfig() {

                    this.logger.debug('Update layout config');

                    /**
                     * Get page preferences
                     * @type {{
                     *      layoutColumns: number
                     * }}
                     */
                    var preferences = this.model.getConfig('preferences') || {};

                    /**
                     * Get layout
                     * @type {Layout}
                     */
                    var layout = this.layout;

                    layout.observer.publish(
                        layout.eventmanager.eventList.updateNumberOfColumns,
                        preferences.layoutColumns
                    );
                },

                /**
                 * Update page height
                 * @member PageController
                 */
                updateHeight: function updateHeight() {
                    console.log('TODO: Update height');
                },

                /**
                 * Get widgets container
                 * @member PageController
                 * @returns {*}
                 */
                getWidgetsContainer: function getWidgetsContainer() {
                    return this.scope.view.elements.$widgets;
                },

                /**
                 * Update widget properties
                 * @member PageController
                 * @param [item]
                 * @returns {boolean}
                 */
                updateWidgetsConfig: function updateWidgetsConfig(item) {

                    /**
                     * Define scope
                     * @type {Page}
                     */
                    var scope = this.scope,
                        items = this.model.getItems(),
                        grid = scope.layout.controller.minCellWidth() +
                            scope.layout.config.grid.margin;

                    if (scope.layout.config.mode === scope.LAYOUT_MODES.jqUIGrid) {

                        if (this.base.isDefined(item)) {

                            item.controller.updateDraggable('grid', [grid, grid]);
                            item.controller.updateResizable('grid', grid);

                            return item;
                        }

                        for (var index in items) {

                            if (items.hasOwnProperty(index)) {

                                /**
                                 * Define widget
                                 * @type {Widget}
                                 */
                                var widget = items[index];

                                widget.controller.updateDraggable('grid', [grid, grid]);
                                widget.controller.updateResizable('grid', grid);
                            }
                        }
                    }
                }
            },

            AntHill.prototype,
            BaseController.prototype,
            BasePage.prototype,
            BasePreferences.prototype,
            PageLayer.prototype,
            PageMaximize.prototype,
            Router.prototype
        );
    }
);