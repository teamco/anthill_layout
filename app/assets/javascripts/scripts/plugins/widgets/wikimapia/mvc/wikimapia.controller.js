/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineWikimapiaController(PluginBase, WidgetContentController) {

    /**
     * Define Wikimapia controller
     * @class WikimapiaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var WikimapiaController = function WikimapiaController() {
    };

    return WikimapiaController.extend('WikimapiaController', {

        /**
         * Set embedded content
         * @memberOf WikimapiaController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('wikimapiaEmbedCode')
            );
        },

        /**
         * Add Wikimapia rule
         * @memberOf WikimapiaController
         * @param e
         */
        addWikimapiaRule: function addWikimapiaRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Wikimapia|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
