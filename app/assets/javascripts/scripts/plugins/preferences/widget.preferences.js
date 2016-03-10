/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'plugins/preferences/preferences'
], function defineWidgetPreferences(BasePreferencesElement) {

    /**
     * Define prefs
     * @class WidgetPreferences
     * @extends Renderer
     * @extends BasePreferencesElement
     * @constructor
     */
    var WidgetPreferences = function WidgetPreferences() {
    };

    return WidgetPreferences.extend('WidgetPreferences', {

        /**
         * Render form element
         * @param hash
         * @param {string} title
         * @memberOf WidgetPreferences
         * @return {Array}
         */
        renderPrefsForm: function renderPrefsForm(hash, title) {

            /**
             * Define dom nodes
             * @type {Array}
             */
            var nodes = [];

            for (var index in hash) {

                if (hash.hasOwnProperty(index)) {

                    // Define node
                    var node = hash[index];

                    /**
                     * Define text
                     * @type {string}
                     */
                    var text = index.replace(
                        title.replace(/ /g, '').toLowerCase(), ''
                    ).toPoint().humanize();

                    nodes.push(
                        $('<div />').
                            addClass([
                                title.humanize().toClassName() + '-prefs',
                                node.type,
                                node.visible ? '' : 'hidden',
                                node.separator ? 'separator' : ''
                            ].join(' ')).append(
                            this.getNodeRenderer(node, text, index)
                        )
                    );
                }
            }

            return nodes;
        },

        /**
         * Merge prefs
         * @memberOf WidgetPreferences
         * @param defaults
         * @param prefs
         * @returns {{}}
         * @private
         */
        mergeWidgetPrefs: function mergeWidgetPrefs(defaults, prefs) {

            for (var index in prefs) {

                if (prefs.hasOwnProperty(index)) {

                    if (defaults.hasOwnProperty(index)) {

                        defaults[index].value = prefs[index];

                    } else {

                        // Reset checked
                        for (var key in defaults) {

                            if (defaults.hasOwnProperty(key)) {

                                if (defaults[key].group === index) {

                                    defaults[key].checked = false;
                                }
                            }
                        }

                        if (defaults.hasOwnProperty(prefs[index])) {

                            // check input-radio
                            defaults[prefs[index]].checked = true;
                        }
                    }
                }
            }

            return defaults;
        },


        /**
         * Render prefs data
         * @memberOf WidgetPreferences
         * @param data
         */
        renderBasePrefsData: function renderBasePrefsData(data) {

            // Get scope
            var scope = this.view.scope;

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = scope.controller.getContainment();

            /**
             * Define widget default prefs
             * @type {{
             *      title: {type: string, disabled: boolean, value},
             *      description: {type: string, disabled: boolean, value},
             *      widgetUrl: {type: string, disabled: boolean, value},
             *      onClickOpenUrl: {type: string, disabled: boolean, value},
             *      customClassName: {type: string, disabled: boolean, value},
             *      statistics: {type: string, disabled: boolean, checked: boolean}
             * }}
             */
            var defaultPrefs = {
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
                widgetUrl: {
                    type: 'textarea',
                    disabled: true,
                    value: undefined,
                    visible: true
                },
                onClickOpenUrl: {
                    type: 'textarea',
                    disabled: false,
                    value: undefined,
                    visible: true
                },
                customClassName: {
                    type: 'text',
                    disabled: false,
                    value: undefined,
                    visible: true
                },
                statistics: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                hideContentOnDrag: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                hideContentOnResize: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                pageContainment: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                }
            };

            var $tabs = this.renderTabs(),
                $container = this.renderTabItemsContent(),
                text = 'Widget';

            this.$.append($tabs, $container);

            this.addTabItem($tabs, {
                uuid: 'widget',
                text: text,
                $container: $container,
                content: this.renderPrefsForm(
                    this.mergeWidgetPrefs(
                        defaultPrefs,
                        widget.model.getConfig('preferences')
                    ),
                    text
                )
            }, true);

            text = scope.name.humanize();
            this.addTabItem($tabs, {
                uuid: 'content',
                text: text,
                $container: $container,
                content: this.renderPrefsForm(
                    data, text
                )
            });

            text = 'Widget Interactions';
            this.addTabItem($tabs, {
                uuid: 'widget-interactions',
                text: text,
                $container: $container,
                content: this.renderPrefsForm(
                    this.renderWidgetInteractions(widget), text
                )
            });

            text = 'Layout';
            this.addTabItem($tabs, {
                uuid: 'layout',
                text: text,
                $container: $container,
                content: this.renderPrefsForm(
                    this.renderLayoutInteractions(), text
                )
            });
        },

        /**
         * Render widget interactions
         * @memberOf WidgetPreferences
         * @param {Widget} widget
         * @returns {*}
         */
        renderWidgetInteractions: function renderWidgetInteractions(widget) {

            var preferences = widget.model.getConfig('preferences'),

                maximizablePermission = !!widget.permission.getCapability('maximizable'),
                zoomablePermission = !!widget.permission.getCapability('zoomable'),
                draggablePermission = !!widget.permission.getCapability('draggable'),
                resizablePermission = !!widget.permission.getCapability('resizable'),

                maximizable = maximizablePermission ?
                    !!preferences.maximizable : false,

                zoomable = zoomablePermission ?
                    !!preferences.zoomable : false,

                draggable = draggablePermission ?
                    !!preferences.draggable : false,

                resizable = resizablePermission ?
                    !!preferences.resizable : false;

            /**
             * Define prefs
             * @type {{
             *      overlapping: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      alwaysOnTop: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      setLayerUp: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setLayerDown: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      stretchWidth: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      stretchHeight: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      maximizable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      zoomable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      draggable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      resizable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      freeze: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      expandable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
             *      unsetStick: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setStickToCenterLeft: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setStickToCenterTop: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setStickToCenter: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setStickToCenterBottom: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setStickToCenterRight: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setStickToTopLeft: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setStickToBottomLeft: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setStickToTopRight: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
             *      setStickToBottomRight: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean}
             * }}
             */
            var prefs = {
                overlapping: {
                    type: 'checkbox',
                    disabled: false,
                    checked: preferences.overlapping,
                    visible: true
                },
                alwaysOnTop: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                stretchWidth: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                stretchHeight: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                maximizable: {
                    type: 'checkbox',
                    disabled: !maximizablePermission,
                    checked: maximizable,
                    visible: true
                },
                zoomable: {
                    type: 'checkbox',
                    disabled: !zoomablePermission,
                    checked: zoomable,
                    visible: true
                },
                draggable: {
                    type: 'checkbox',
                    disabled: !draggablePermission,
                    checked: draggable,
                    visible: true
                },
                resizable: {
                    type: 'checkbox',
                    disabled: !resizablePermission,
                    checked: resizable,
                    visible: true
                },
                freeze: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                commentable: {
                    type: 'checkbox',
                    disabled: false,
                    checked: true,
                    visible: true
                },
                shareable: {
                    type: 'checkbox',
                    disabled: false,
                    checked: true,
                    visible: true
                },
                expandable: {
                    type: 'checkbox',
                    disabled: false,
                    checked: true,
                    visible: true
                },
                scrollable: {
                    type: 'checkbox',
                    disabled: false,
                    checked: true,
                    visible: true
                },
                setLayerUp: {
                    type: 'event',
                    disabled: false,
                    group: 'layer',
                    events: ['click'],
                    checked: false,
                    visible: true,
                    separator: true
                },
                setLayerDown: {
                    type: 'event',
                    disabled: false,
                    group: 'layer',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                unsetStick: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: true,
                    visible: true,
                    separator: true
                },
                setStickToCenterLeft: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToCenterTop: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToCenter: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToCenterBottom: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToCenterRight: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToTopLeft: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToBottomLeft: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToTopRight: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToBottomRight: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                }
            };

            return this.mergeWidgetPrefs(
                prefs,
                widget.model.getConfig('preferences')
            );
        },

        /**
         * Render Layout interactions
         * @memberOf WidgetPreferences
         * @returns {*}
         */
        renderLayoutInteractions: function renderLayoutInteractions() {

            /**
             * Define controller
             * @type {*}
             */
            var controller = this.view.controller;

            /**
             * Define dom prefs
             */
            var column = controller.getDOMPreferences('column'),
                row = controller.getDOMPreferences('row'),
                width = controller.getDOMPreferences('relWidth'),
                height = controller.getDOMPreferences('relHeight');

            return {
                column: this.renderPrefs('Column', column),
                width: this.renderPrefs('Width', width),
                row: this.renderPrefs('Row', row),
                height: this.renderPrefs('Height', height)
            };
        },

        /**
         * Render move
         * @memberOf WidgetPreferences
         * @param {string} side
         * @param value
         * @returns {*|jQuery}
         */
        renderPrefs: function renderPrefs(side, value) {

            return {
                type: 'text',
                name: side.toLowerCase(),
                text: side,
                placeholder: side,
                value: value,
                disabled: true,
                visible: true
            };
        }

    }, BasePreferencesElement.prototype);
});