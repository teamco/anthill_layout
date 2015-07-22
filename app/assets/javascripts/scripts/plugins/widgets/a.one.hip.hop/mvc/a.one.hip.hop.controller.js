/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineAOneHipHopController(PluginBase, WidgetContentController) {

    /**
     * Define aonehiphop controller
     * @class AOneHipHopController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var AOneHipHopController = function AOneHipHopController() {
    };

    return AOneHipHopController.extend('AOneHipHopController', {

        /**
         * Set embedded content
         * @memberOf AOneHipHopController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$aonehiphop.renderEmbeddedContent(
                this.model.getPrefs('aonehiphopEmbedCode')
            );
        },

        /**
         * Add AOneHipHop rule
         * @memberOf AOneHipHopController
         * @param e
         */
        addAOneHipHopRule: function addAOneHipHopRule(e) {

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
