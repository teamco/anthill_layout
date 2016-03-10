/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'jquery',
    'plugins/preferences/preferences'
], function definePagesPreferences($, BasePreferencesElement) {

    /**
     * Define prefs
     * @class PagesPreferences
     * @extends Renderer
     * @extends BasePreferencesElement
     * @constructor
     */
    var PagesPreferences = function PagesPreferences() {
    };

    return PagesPreferences.extend('PagesPreferences', {

        /**
         * Render data
         * @memberOf PagesPreferences
         * @param {data} opts
         */
        renderData: function renderData(opts) {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var ws = this.view.controller.getWorkspace(),
                config = ws.model.getConfig('page');

            /**
             * Define default widget prefs
             * @type {{
             *      title: {type: string, disabled: boolean, value},
             *      siteDescription: {type: string, disabled: boolean, value},
             *      siteKeywords: {type: string, disabled: boolean, value},
             *      pageUrl: {type: string, disabled: boolean, value},
             *      pageHeader: {type: string, disabled: boolean, value},
             *      pageFooter: {type: string, disabled: boolean, value},
             *      animateSwipe: {type: string, disabled: boolean, value}
             *      showInTabs: {type: string, disabled: boolean, value}
             * }}
             */
            var defaultPrefs = {
                title: {
                    type: 'text',
                    disabled: false,
                    value: undefined,
                    visible: true
                },
                siteDescription: {
                    type: 'textarea',
                    disabled: false,
                    value: undefined,
                    visible: true
                },
                siteKeywords: {
                    type: 'textarea',
                    disabled: false,
                    value: undefined,
                    visible: true
                },
                pageUrl: {
                    type: 'text',
                    disabled: true,
                    value: undefined,
                    visible: true
                },
                pageHeader: {
                    type: 'checkbox',
                    disabled: false,
                    value: false,
                    visible: true
                },
                pageFooter: {
                    type: 'checkbox',
                    disabled: false,
                    value: false,
                    visible: true
                },
                animateSwipe: {
                    type: 'checkbox',
                    disabled: false,
                    value: config.animateSwipe,
                    visible: true
                },
                showInTabs: {
                    type: 'checkbox',
                    disabled: false,
                    value: config.showInTabs,
                    visible: true
                },
                lazyLoading: {
                    type: 'checkbox',
                    disabled: false,
                    value: false,
                    visible: true
                },
                outlineContainment: {
                    type: 'checkbox',
                    disabled: false,
                    value: false,
                    visible: true
                }
            };

            /**
             * Define dom nodes
             * @type {Array}
             */
            var nodes = [];

            /**
             * Merge prefs
             * @param defaults
             * @param prefs
             * @returns {{}}
             * @private
             */
            function _mergePrefs(defaults, prefs) {

                for (var index in prefs) {

                    if (prefs.hasOwnProperty(index)) {

                        if (defaults.hasOwnProperty(index)) {

                            defaults[index].value = prefs[index];

                        } else if (defaults.hasOwnProperty(prefs[index])) {

                            // input-radio
                            defaults[prefs[index]].value = true;
                        }
                    }
                }

                return defaults;
            }

            /**
             * Merge prefs with default data
             * @type {{}}
             */
            opts.data = _mergePrefs(
                defaultPrefs,
                $.extend(opts.data, {}, true)
            );

            for (var index in opts.data) {

                if (opts.data.hasOwnProperty(index)) {

                    /**
                     * Define isCheckBox
                     * @type {boolean}
                     */
                    var isCheckBox = opts.data[index].type === 'checkbox',
                        className = 'page-prefs' + (isCheckBox ? ' checkbox' : '');

                    nodes.push(
                        $('<li />').append(
                            this.getNodeRenderer(
                                opts.data[index],
                                index.toPoint().humanize(),
                                index
                            )
                        ).addClass(className)
                    );
                }
            }

            var $tabs = this.renderTabs(),
                $container = this.renderTabItemsContent(),
                text = 'Meta Data';

            this.$.append($tabs, $container);

            this.addTabItem($tabs, {
                uuid: 'meta_data',
                text: text,
                $container: $container,
                content: $('<ul class="default" />').append(nodes)
            }, true);

            text = 'Layout';
            this.addTabItem($tabs, {
                uuid: 'layout',
                text: text,
                $container: $container,
                content: this.renderLayoutPrefs(opts.page)
            });

            var node = this.renderWidgetsPrefs(opts.page);
            this.addTabItem($tabs, {
                uuid: 'widgets',
                text: node[1],
                $container: $container,
                content: node[0]
            });
        },

        /**
         * Render Layout prefs
         * @memberOf PagesPreferences
         * @param {Page} page
         * @returns {*}
         */
        renderLayoutPrefs: function renderLayoutPrefs(page) {

            /**
             * Define layout
             * @type {Layout}
             */
            var layout = page.controller.getLayout(),
                workspace = page.controller.getContainment(),
                modes = page.LAYOUT_MODES;

            /**
             * Define layout container
             * @type {*|jQuery}
             */
            var $ul = $('<ul class="default" />').addClass('layout-prefs');

            /**
             * Define dom prefs
             * @type {Number}
             */
            var cellWidth = layout.controller.minCellWidth();

            /**
             * Get static width value
             * @type {boolean|*}
             */
            var staticWidth = workspace.model.getConfig('preferences').staticWidth;

            /**
             * Get page width
             * @type {number|string}
             */
            var width = staticWidth ?
                page.view.get$item().getWidth() : 'Flexible';

            // Get padding
            var padding = page.model.getConfig('html/padding');

            return $ul.append([

                $('<li />').append(
                    this.renderTextField({
                        name: 'layout-cell-width',
                        text: 'Cell size',
                        value: cellWidth.toFixed(3),
                        visible: true,
                        disabled: true
                    })
                ).attr('rel', 'layout-cell-width'),

                $('<li />').append(
                    this.renderCombobox(
                        [
                            {
                                type: 'text',
                                value: modes.freeStyle
                            },
                            {
                                type: 'text',
                                value: modes.jqUIGrid
                            },
                            {
                                type: 'text',
                                value: modes.snap2grid
                            }
                        ],
                        layout.controller.getBehaviorMode(),
                        'Mode',
                        'layoutMode',
                        undefined,
                        true
                    )
                ).attr('rel', 'layout-behavior'),

                $('<li />').append(
                    this.renderTextField({
                        name: 'page-width',
                        text: 'Page width',
                        value: width,
                        visible: true,
                        disabled: true
                    })
                ).attr('rel', 'page-width').
                    addClass('page-width'),

                $('<li />').append(
                    this.renderTextField({
                        name: 'layoutColumns',
                        text: 'Columns',
                        value: layout.config.grid.columns,
                        visible: true,
                        disabled: false
                    })
                ).attr('rel', 'layout-columns').
                    addClass('page-layout-columns'),

                $('<li />').append(
                    this.renderNumberField({
                        name: 'pagePaddingTop',
                        text: 'Padding top',
                        value: padding.top,
                        visible: true,
                        disabled: false
                    })
                ).attr('rel', 'page-padding-top').
                    addClass('page-padding'),

                $('<li />').append(
                    this.renderNumberField({
                        name: 'pagePaddingLeft',
                        text: 'Padding left',
                        value: padding.left,
                        visible: true,
                        disabled: false
                    })
                ).attr('rel', 'page-padding-left').
                    addClass('page-padding'),

                $('<li />').append(
                    this.renderNumberField({
                        name: 'pagePaddingBottom',
                        text: 'Padding bottom',
                        value: padding.bottom,
                        visible: true,
                        disabled: false
                    })
                ).attr('rel', 'page-padding-bottom').
                    addClass('page-padding'),

                $('<li />').append(
                    this.renderNumberField({
                        name: 'pagePaddingRight',
                        text: 'Padding right',
                        value: padding.right,
                        visible: true,
                        disabled: false
                    })
                ).attr('rel', 'page-padding-right').
                    addClass('page-padding')
            ]);
        },

        /**
         * Render widgets prefs
         * @memberOf PagesPreferences
         * @param {Page} page
         * @returns {*}
         */
        renderWidgetsPrefs: function renderWidgetsPrefs(page) {

            /**
             * Get page items
             * @type {*}
             */
            var widgets = page.model.getItems();

            /**
             * Render widgets
             * @returns {Array}
             * @private
             */
            function _renderWidgets() {

                var list = [],
                    widget, uuid,
                    title, index;

                for (index in widgets) {

                    if (widgets.hasOwnProperty(index)) {

                        /**
                         * Define widget
                         * @type {Widget}
                         */
                        widget = widgets[index];

                        /**
                         * Define uuid
                         * @type {String}
                         */
                        uuid = widget.model.getUUID();

                        /**
                         * Get widget preferences
                         * @type {*}
                         */
                        var preferences = widget.model.getConfig('preferences');

                        var thumbnail = preferences.thumbnail || '',
                            css = thumbnail.length > 0 ? {backgroundImage: 'url("' + thumbnail + '")'} : {};

                        /**
                         * Get title
                         * @type {*|String}
                         */
                        title = widget.model.getItemTitle();

                        /**
                         * Define widget element
                         * @type {*|jQuery}
                         */
                        var $li = $('<li class="widget widget-prefs" />').addClass(
                            this.view.controller.getResourceClassName(
                                preferences.resource
                            )
                        ).attr({
                                rel: uuid,
                                title: title
                            }).css(css).

                            on('mouseenter.widgetPrefs mouseleave.widgetPrefs click.widgetPrefs',
                            this.showWidgetPrefs.bind(this)
                        );

                        this.renderTooltip({
                            title: title,
                            description: preferences.description || '',
                            selector: $li
                        });

                        list.push($li);
                    }
                }

                return list.length > 0 ? list :
                    '<li class="no-content">No content available</li>';
            }

            /**
             * Define widgets container
             * @type {*|jQuery}
             */
            var $ul = $('<ul class="default" />').addClass('widgets-prefs'),
                cname = 'Widgets: ' + Object.keys(widgets).length + ' items';

            return [
                $ul.append(
                    this.renderPageWidgetsGlobalPrefs(),
                    '<li class="separator" />',
                    _renderWidgets.bind(this)()
                ),
                cname
            ];
        },

        /**
         * Render page widgets global preferences
         * @memberOf PagesPreferences
         * @returns {Array}
         */
        renderPageWidgetsGlobalPrefs: function renderPageWidgetsGlobalPrefs() {

            /**
             * Get active page
             * @type {Page}
             */
            var page = this.view.scope.activeContent;

            /**
             * Define page widgets global prefs
             * @type {{overlapping: {type: string, disabled: boolean, checked: boolean, visible: boolean}}}
             */
            var globalPrefs = {
                overlapping: {
                    type: 'checkbox',
                    disabled: false,
                    checked: page.model.getConfig('widget/overlapping'),
                    visible: true
                }
            };

            /**
             * Define List node
             * @type {Array}
             */
            var nodes = [];

            for (var index in globalPrefs) {

                if (globalPrefs.hasOwnProperty(index)) {

                    var node = globalPrefs[index],
                        $element;

                    /**
                     * Define text
                     * @type {string}
                     */
                    var text = index.toPoint().humanize();

                    if (node.type === 'checkbox') {

                        /**
                         * Get checkbox
                         * @type {*[]}
                         */
                        $element = this.renderCheckbox({
                            name: index,
                            text: text.trim(),
                            checked: node.checked,
                            value: node.checked,
                            disabled: node.disabled,
                            visible: node.visible
                        });
                    }

                    nodes.push(
                        $('<li />').
                            addClass([
                                [page.name.toClassName(), index].join('-'),
                                node.type,
                                node.visible ? '' : 'hidden'
                            ].join(' ')).
                            append($element)
                    );
                }
            }

            return nodes;
        },

        /**
         * Show Widget prefs
         * @memberOf PagesPreferences
         * @param e
         */
        showWidgetPrefs: function showWidgetPrefs(e) {

            /**
             * Trigger click prefs
             * @private
             */
            function _triggerPrefs() {

                /**
                 * Define $item
                 * @type {PageDataContentElement}
                 */
                var $item = this.view.elements.items[uuid + '-page-data'];

                $item.$.trigger('click.prefs');
            }

            /**
             * Trigger locate element
             * @param event
             * @private
             */
            function _locateElement(event) {

                this.observer.publish(
                    this.eventmanager.eventList.loadPreferences, [
                        {uuid: uuid},
                        false,
                        event,
                        this.controller.locatePageData.bind(
                            this.controller
                        )
                    ]
                );
            }

            /**
             * Get uuid
             * @type {*|jQuery}
             */
            var uuid = $(e.target).attr('rel');

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.view.controller.getDesignTimePanel();

            /**
             * Define page data
             * @type {*|PageData}
             */
            var pageData = this.view.controller.getModuleByName('page-data');

            /**
             * Get scope
             * @type {WorkspaceData}
             */
            var scope = this.view.scope;

            if (e.type === 'click') {

                scope.observer.publish(
                    scope.eventmanager.eventList.switchToActivePage
                );

                this.view.elements.$modal.selfDestroy();

                panel.observer.publish(
                    panel.eventmanager.eventList.openPanel,
                    ['page-data', e, _triggerPrefs.bind(pageData)]
                );
            }

            if (e.type === 'mouseenter' || e.type === 'mouseleave') {

                scope.observer.publish(
                    scope.eventmanager.eventList.switchToActivePage
                );

                panel.observer.publish(
                    panel.eventmanager.eventList.openPanel,
                    ['page-data', e, _locateElement.bind(pageData)]
                );
            }
        }

    }, BasePreferencesElement.prototype);
});