/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineMetamorphicController(PluginBase, WidgetContentController) {

    /**
     * Define Metamorphic controller
     * @class MetamorphicController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MetamorphicController = function MetamorphicController() {
    };

    return MetamorphicController.extend('MetamorphicController', {

        /**
         * Set embedded content
         * @memberOf MetamorphicController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        fetchMetamorphicPreferences: function fetchMetamorphicPreferences(e) {
debugger
        },

        /**
         * Fetch gallery widgets
         * @param {{metamorphicType}} prefs
         * @memberOf MetamorphicController
         * @returns {*}
         */
        fetchGalleryWidgets: function fetchGalleryWidgets(prefs) {

            /**
             * Get scope
             * @type {Metamorphic|{name}}
             */
            var scope = this.scope;

            try {

                /**
                 * Get page data
                 * @type {PageData}
                 */
                var pageData = scope.referrer;

                /**
                 * Get gallery
                 * @type {Gallery}
                 */
                var gallery = pageData.controller.getContainment().controller.getGallery();

                var widgetsList = gallery.model.getDataProvider(),
                    _selfResource = scope.name.toDash().toResource();

                // Get widgets list
                prefs.metamorphicType.list = $.map(
                    widgetsList,
                    function _loadWidget(widget) {

                        if (widget.resource !== _selfResource && !widget.is_external) {

                            return {
                                resource: widget.resource,
                                name: widget.name,
                                description: widget.description,
                                tooltip: true
                            }
                        }
                    }
                );

            } catch (e) {

                scope.logger.warn('Unable to fetch gallery widgets', e);
            }

            return prefs;
        },

        /**
         * Add Metamorphic rule
         * @memberOf MetamorphicController
         * @param e
         */
        addMetamorphicRule: function addMetamorphicRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Metamorphic|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
