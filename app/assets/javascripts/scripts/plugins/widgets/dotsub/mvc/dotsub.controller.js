/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineDotsubController(PluginBase, WidgetContentController) {

    /**
     * Define Dotsub controller
     * @class DotsubController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var DotsubController = function DotsubController() {
    };

    return DotsubController.extend('DotsubController', {

        /**
         * Set embedded content
         * @memberOf DotsubController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('dotsubEmbedCode')
            );
        },

        /**
         * Add Dotsub rule
         * @memberOf DotsubController
         * @param e
         */
        addDotsubRule: function addDotsubRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Dotsub|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
