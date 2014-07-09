/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'plugins/preferences/preferences'
], function definePagesPreferences(BasePreferences) {

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

                            $('<li class="layout-prefs" />').append(
                                this.renderTextField({
                                    name: 'cell',
                                    text: 'Cell size',
                                    value: cellWidth,
                                    disabled: true
                                })
                            ).attr('rel', 'layout-cell'),

                            $('<li class="layout-prefs" />').append(
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
                            ).attr('rel', 'layout-behavior')
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
             * Render widgets
             * @returns {Array}
             * @private
             */
            function _renderWidgets() {

                var list = [];

                /**
                 * Get page widgets
                 * @type {*}
                 */
                var widgets = page.model.getItems(),
                    widget, uuid,
                    title;

                for (var index in widgets) {

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
                        title = preferences.title || uuid;

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

                return list;
            }

            /**
             * Define widgets container
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').addClass('widgets-prefs'),
                cname = 'Widgets';

            nodes.push(
                $('<li />').append(
                    $('<fieldset />').append(
                        $('<legend />').text(cname).
                            on('click.toggle', this.toggleFieldset.bind(this)).attr({
                                title: cname
                            }),

                        $ul.append(_renderWidgets.bind(this)())
                    )
                )
            );

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

            if (e.type === 'click') {

                this.view.elements.$modal.selfDestroy();

                panel.observer.publish(
                    panel.eventmanager.eventList.openPanel,
                    ['page-data', e, _triggerPrefs.bind(pageData)]
                );
            }

            if (e.type === 'mouseenter' || e.type === 'mouseleave') {

                panel.observer.publish(
                    panel.eventmanager.eventList.openPanel,
                    ['page-data', e, _locateElement.bind(pageData)]
                );
            }
        }

    }, BasePreferences.prototype);
});