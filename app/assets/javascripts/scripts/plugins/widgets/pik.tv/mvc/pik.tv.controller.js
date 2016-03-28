/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function definePikTvController(PluginBase, WidgetContentController) {

    /**
     * Define piktv controller
     * @class PikTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PikTvController = function PikTvController() {
    };

    return PikTvController.extend('PikTvController', {

        /**
         * Set embedded content
         * @memberOf PikTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$piktv.renderEmbeddedContent(
                this.model.getPrefs('piktvUrl')
            );
        },

        /**
         * Add PikTv rule
         * @memberOf PikTvController
         * @param e
         */
        addPikTvRule: function addPikTvRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
