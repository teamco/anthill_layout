/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'plugins/preferences/preferences'
], function defineWidgetPreferences(BasePreferences) {

    /**
     * Define prefs
     * @class WidgetPreferences
     * @extends Renderer
     * @extends BasePreferences
     * @constructor
     */
    var WidgetPreferences = function WidgetPreferences() {

    };

    return WidgetPreferences.extend('WidgetPreferences', {

        /**
         * Render form element
         * @param {{}} hash
         * @param {string} title
         * @member WidgetPreferences
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
                        $('<li />').
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
         * Render node
         * @member WidgetPreferences
         * @param type
         * @param prefs
         * @param {string} title
         * @param {boolean} [isOpened]
         * @returns {*|jQuery}
         */
        renderPrefsNode: function renderPrefsNode(type, prefs, title, isOpened) {

            return $('<li />').append(
                this.renderFieldSet(
                    title,
                    $('<ul />').addClass(type).append(
                        this.renderPrefsForm(prefs, title)
                    ),
                    isOpened
                )
            ).addClass('auto');
        },

        /**
         * Merge prefs
         * @member WidgetPreferences
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
         * @member WidgetPreferences
         * @param data
         */
        renderBasePrefsData: function renderBasePrefsData(data) {

            /**
             * Define widget default prefs
             * @type {{
             *      title: {type: string, disabled: boolean, value},
             *      description: {type: string, disabled: boolean, value},
             *      widgetUrl: {type: string, disabled: boolean, value},
             *      onClickOpenUrl: {type: string, disabled: boolean, value},
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
                statistics: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                }
            };

            // Get scope
            var scope = this.view.scope;

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = scope.controller.getContainment();

            this.$.append(
                this.renderLayoutInteractions([
                    this.renderPrefsNode(
                        'default',
                        this.mergeWidgetPrefs(
                            defaultPrefs,
                            widget.model.getConfig('preferences')
                        ),
                        'Widget'
                    ),
                    this.renderPrefsNode(
                        'content', data,
                        scope.name.humanize(), true
                    ),
                    this.renderPrefsNode(
                        'widget-interactions',
                        this.renderWidgetInteractions(widget),
                        'Widget Interactions'
                    )
                ])
            );
        },

        /**
         * Render widget interactions
         * @member WidgetPreferences
         * @param {Widget} widget
         * @returns {*}
         */
        renderWidgetInteractions: function renderWidgetInteractions(widget) {

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
                    checked: false,
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
                    visible: true
                },
                setLayerDown: {
                    type: 'event',
                    disabled: false,
                    group: 'layer',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                draggable: {
                    type: 'checkbox',
                    disabled: false,
                    checked: true,
                    visible: true
                },
                resizable: {
                    type: 'checkbox',
                    disabled: false,
                    checked: true,
                    visible: true
                },
                freeze: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                expandable: {
                    type: 'checkbox',
                    disabled: false,
                    checked: true,
                    visible: true,
                    separator: true
                },
                unsetStick: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: true,
                    visible: true
                },
                setStickToCenterLeft: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true,
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
         * @member WidgetPreferences
         * @param {Array} nodes
         * @returns {*}
         */
        renderLayoutInteractions: function renderLayoutInteractions(nodes) {

            /**
             * Define controller
             * @type {*}
             */
            var controller = this.view.controller;

            /**
             * Define interactions container
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').addClass('interactions');

            /**
             * Define dom prefs
             */
            var column = controller.getDOMPreferences('column'),
                row = controller.getDOMPreferences('row'),
                width = controller.getDOMPreferences('relWidth'),
                height = controller.getDOMPreferences('relHeight');

            nodes.push(
                $('<li />').append(
                    this.renderFieldSet(
                        'Layout Interactions',
                        $ul.append([
                            this.renderPrefs('Column', column),
                            this.renderPrefs('Width', width),
                            this.renderPrefs('Row', row),
                            this.renderPrefs('Height', height)
                        ])
                    )
                ).addClass('auto')
            );

            return nodes;
        },

        /**
         * Render move
         * @member WidgetPreferences
         * @param {string} side
         * @param value
         * @returns {*|jQuery}
         */
        renderPrefs: function renderPrefs(side, value) {

            /**
             * Define move
             * @type {*[]}
             */
            var $move = this.renderTextField({
                name: side.toLowerCase(),
                text: side,
                placeholder: side,
                value: value,
                disabled: true,
                visible: true
            });

            return $('<li />').append($move);
        }

    }, BasePreferences.prototype);
});