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
                        $('<div />').addClass([
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

            // Get default prefs
            var defaultPrefs = widget.controller.getPreferences().defaults;

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

            text = 'InteractionsInteractions';
            this.addTabItem($tabs, {
                uuid: 'widget-interactions',
                text: text,
                $container: $container,
                content: this.renderPrefsForm(
                    this.renderWidgetInteractions(widget), text
                )
            });

            text = 'Layout Layout';
            this.addTabItem($tabs, {
                uuid: 'layout',
                text: text,
                $container: $container,
                content: this.renderPrefsForm(
                    this.renderLayoutInteractions(), text
                )
            });

            text = 'Source Source';
            this.addTabItem($tabs, {
                uuid: 'source',
                text: text,
                $container: $container,
                content: this.renderSource(
                    this.view.get$item().$.parent().html(),
                    'xml', {
                        visible: true
                    }
                )
            });text = 'Source1';
            this.addTabItem($tabs, {
                uuid: 'source',
                text: text,
                $container: $container,
                content: this.renderSource(
                    this.view.get$item().$.parent().html(),
                    'xml', {
                        visible: true
                    }
                )
            });text = 'Source 3';
            this.addTabItem($tabs, {
                uuid: 'source',
                text: text,
                $container: $container,
                content: this.renderSource(
                    this.view.get$item().$.parent().html(),
                    'xml', {
                        visible: true
                    }
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

            // Get interaction prefs
            var interactions = widget.controller.getPreferences().interactions;

            interactions.overlapping.checked = preferences.overlapping;

            interactions.maximizable.disabled = !maximizablePermission;
            interactions.maximizable.checked = maximizable;

            interactions.zoomable.disabled = !zoomablePermission;
            interactions.zoomable.checked = zoomable;
            
            interactions.draggable.disabled = !draggablePermission;
            interactions.draggable.checked = draggable;

            interactions.resizable.disabled = !resizablePermission;
            interactions.resizable.checked = resizable;

            return this.mergeWidgetPrefs(
                interactions,
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
             * Render layout
             * @private
             * @param {string} side
             * @param value
             * @returns {*|jQuery}
             */
            function _renderPrefs(side, value) {

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

            /**
             * Define controller
             * @type {*}
             */
            var controller = this.view.controller;

            // Define dom prefs
            var column = controller.getDOMPreferences('column'),
                row = controller.getDOMPreferences('row'),
                width = controller.getDOMPreferences('relWidth'),
                height = controller.getDOMPreferences('relHeight');

            return {
                column: _renderPrefs('Column', column),
                width: _renderPrefs('Width', width),
                row: _renderPrefs('Row', row),
                height: _renderPrefs('Height', height)
            };
        }

    }, BasePreferencesElement.prototype);
});