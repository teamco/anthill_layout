/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePremiereTvController(PluginBase, WidgetContentController) {

    /**
     * Define premieretv controller
     * @class PremiereTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PremiereTvController = function PremiereTvController() {
    };

    return PremiereTvController.extend('PremiereTvController', {

        /**
         * Set embedded content
         * @member PremiereTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$premieretv.renderEmbeddedContent(
                this.model.getPrefs('premieretvEmbedCode')
            );
        },

        /**
         * Add PremiereTv rule
         * @member PremiereTvController
         * @param e
         */
        addPremiereTvRule: function addPremiereTvRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
