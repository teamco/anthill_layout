/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSapoVideosController(PluginBase, WidgetContentController) {

    /**
     * Define SapoVideos controller
     * @class SapoVideosController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SapoVideosController = function SapoVideosController() {
    };

    return SapoVideosController.extend('SapoVideosController', {

        /**
         * Set embedded content
         * @memberOf SapoVideosController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('sapovideosEmbedCode')
            );
        },

        /**
         * Add SapoVideos rule
         * @memberOf SapoVideosController
         * @param e
         */
        addSapoVideosRule: function addSapoVideosRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {SapoVideos|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
