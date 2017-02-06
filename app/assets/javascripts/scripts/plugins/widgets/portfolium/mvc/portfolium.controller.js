/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function definePortfoliumController(PluginBase, WidgetContentController) {

    /**
     * Define Portfolium controller
     * @class PortfoliumController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PortfoliumController = function PortfoliumController() {
    };

    return PortfoliumController.extend('PortfoliumController', {

        /**
         * Set embedded content
         * @memberOf PortfoliumController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('portfoliumEmbedCode')
            );
        },

        /**
         * Add Portfolium rule
         * @memberOf PortfoliumController
         * @param {Event} e
         */
        addPortfoliumRule: function addPortfoliumRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Portfolium|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
