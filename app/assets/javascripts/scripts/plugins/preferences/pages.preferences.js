/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'jquery',
    'plugins/preferences/preferences'
], function definePagesPreferences($, BasePreferences) {

    /**
     * Define prefs
     * @class PagesPreferences
     * @extends Renderer
     * @extends BasePreferences
     * @constructor
     */
    var PagesPreferences = function PagesPreferences() {

    };

    return PagesPreferences.extend('PagesPreferences', {

        /**
         * Define default widget prefs
         * @member PagesPreferences
         * @type {{
         *      title: {type: string, disabled: boolean, value},
         *      pageUrl: {type: string, disabled: boolean, value},
         *      description: {type: string, disabled: boolean, value}
         * }}
         */
        defaultPrefs: {
            title: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            description: {
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
            }
        },

        /**
         * Render data
         * @member PagesPreferences
         * @param opts
         */
        renderData: function renderData(opts) {

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
                this.defaultPrefs,
                $.extend(opts.data, {}, true)
            );

            for (var index in opts.data) {

                if (opts.data.hasOwnProperty(index)) {

                    /**
                     * Define text
                     * @type {string}
                     */
                    var text = index.toPoint().humanize();

                    /**
                     * Define node
                     */
                    var node = opts.data[index];

                    /**
                     * Define placeholder text
                     * @type {string}
                     */
                    var placeholder = 'Enter ' + text,
                        textField;

                    if (node.type === 'text') {
                        /**
                         * Get text field
                         * @type {*[]}
                         */
                        textField = this.renderTextField({
                            name: index,
                            text: text,
                            placeholder: placeholder,
                            value: node.value,
                            disabled: node.disabled,
                            visible: node.visible
                        });
                    }

                    if (node.type === 'textarea') {

                        /**
                         * Get text field
                         * @type {*[]}
                         */
                        textField = this.renderTextArea({
                            name: index,
                            text: text,
                            placeholder: placeholder,
                            value: node.value,
                            disabled: node.disabled,
                            visible: node.visible
                        });
                    }

                    nodes.push(
                        $('<li class="page-prefs" />').append(textField)
                    );
                }
            }

            this.$.append(
                this.renderLayoutPrefs(opts.page, nodes)
            ).append(
                this.renderWidgetsPrefs(opts.page, nodes)
            );
        },

        /**
         * Render Layout prefs
         * @member PagesPreferences
         * @param {Page} page
         * @param {Array} nodes
         * @returns {*}
         */
        renderLayoutPrefs: function renderLayoutPrefs(page, nodes) {

            /**
             * Define layout
             * @type {Layout}
             */
            var layout = page.controller.getLayout(),
                modes = page.LAYOUT_MODES,
                cname = layout.constructor.name;

            /**
             * Define layout container
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').addClass('layout-prefs');

            /**
             * Define dom prefs
             * @type {Number}
             */
            var cellWidth = layout.controller.minCellWidth();

            nodes.push(
                $('<li />').append(
                    $('<fieldset />').append(
                        $('<legend />').text(cname).
                            on('click.toggle', this.toggleFieldset.bind(this)).attr({
                                title: cname
                            }),

                        $ul.append([

                            $('<li />').append(
                                this.renderTextField({
                                    name: 'layout-cell',
                                    text: 'Cell size',
                                    value: cellWidth.toFixed(3),
                                    visible: true,
                                    disabled: true
                                })
                            ).attr('rel', 'layout-cell'),

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
                                    name: 'layout-columns',
                                    text: 'Columns',
                                    value: layout.config.grid.columns,
                                    visible: true,
                                    disabled: false
                                })
                            ).attr('rel', 'layout-columns').
                                addClass('page-layout-columns')
                        ])
                    )
                ).addClass('auto')
            );

            return nodes;
        },

        /**
         * Render widgets prefs
         * @member PagesPreferences
         * @param {Page} page
         * @param nodes
         * @returns {*}
         */
        renderWidgetsPrefs: function renderWidgetsPrefs(page, nodes) {

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

                        var thumbnail = preferences.thumbnail,
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
                        var $li = $('<li class="widget-prefs" />').
                            addClass(
                            this.view.controller.getResourceClassName(
                                preferences.resource
                            )
                        ).attr({
                                rel: uuid,
                                title: title
                            }).css(css).

                            on('mouseenter.widgetPrefs mouseleave.widgetPrefs click.widgetPrefs',
                            this.showWidgetPrefs.bind(this));

                        this.renderTooltip({
                            title: title,
                            description: preferences.description || '',
                            $container: {$: $li}
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
            var $ul = $('<ul />').addClass('widgets-prefs'),
                cname = [
                    'Widgets: ',
                    '<span>',
                    Object.keys(widgets).length,
                    'items</span>'
                ].join(' ');

            nodes.push(
                $('<li />').append(
                    $('<fieldset />').append(
                        $('<legend />').html(cname).
                            on('click.toggle', this.toggleFieldset.bind(this)).attr({
                                title: cname
                            }),

                        $ul.append(
                            this.renderPageWidgetsGlobalPrefs(),
                            $('<li class="clear" />'),
                            _renderWidgets.bind(this)()
                        )
                    )
                )
            );

            return nodes;
        },

        /**
         * Render page widgets global preferences
         * @member PagesPreferences
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
                                [page.constructor.name.toClassName(), index].join('-'),
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
         * @member PagesPreferences
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
            var panel = this.view.controller.getAuthorPanel();

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

    }, BasePreferences.prototype);
});