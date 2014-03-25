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
                value: undefined
            },
            description: {
                type: 'textarea',
                disabled: false,
                value: undefined
            },
            pageUrl: {
                type: 'text',
                disabled: true,
                value: undefined
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
             * Merge prefs with default data
             */
            opts.data = $.extend(true, this.defaultPrefs, opts.data);


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
                    var placeholder = 'Enter ' + text;

                    if (node.type === 'text') {
                        /**
                         * Get text field
                         * @type {*[]}
                         */
                        var textField = this.renderTextField({
                            name: index,
                            text: text,
                            placeholder: placeholder,
                            value: node.value,
                            disabled: node.disabled
                        });
                    }

                    if (node.type === 'textarea') {

                        /**
                         * Get text field
                         * @type {*[]}
                         */
                        var textField = this.renderTextArea({
                            name: index,
                            text: text,
                            placeholder: placeholder,
                            value: node.value,
                            disabled: node.disabled
                        });
                    }

                    nodes.push(
                        $('<li />').append(textField)
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
                            on('click.toggle', this.toggleFieldset).attr({
                                title: cname
                            }),

                        $ul.append([

                            $('<li />').append(
                                this.renderTextField({
                                    name: 'cell',
                                    text: 'Cell size',
                                    value: cellWidth,
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
                                    'Mode'
                                )
                            ).attr('rel', 'layout-behavior')
                        ])
                    )
                )
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
                    widget, uuid;

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

                        list.push(
                            $('<li />').
                                attr('rel', uuid).
                                text(uuid).
                                css({backgroundImage: 'url("' + widget.model.getConfig('preferences/thumbnail') + '")'}).
                                on('mouseenter.widgetPrefs click.widgetPrefs',
                                this.showWidgetPrefs.bind(this))
                        );
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
                            on('click.toggle', this.toggleFieldset).attr({
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
                var $item = this.view.elements.items[uuid + '-view'];

                $item.$.trigger('click.prefs');
            }

            /**
             * Trigger locate element
             * @private
             */
            function _locateElement() {

                this.observer.publish(
                    this.eventmanager.eventList.loadPreferences, [
                        {uuid: uuid},
                        false,
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
            var panel = this.view.controller.getPanel();

            /**
             * Define page data
             * @type {*|PageData}
             */
            var pageData = this.view.controller.getPageData();

            if (e.type === 'click') {

                this.view.elements.$modal.selfDestroy();

                panel.observer.publish(
                    panel.eventmanager.eventList.openPanel,
                    ['pagedata', _triggerPrefs.bind(pageData)]
                );
            }

            if (e.type === 'mouseenter') {

                panel.observer.publish(
                    panel.eventmanager.eventList.openPanel,
                    ['pagedata', _locateElement.bind(pageData)]
                );
            }
        }

    }, BasePreferences.prototype);
});