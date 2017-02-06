/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineHeaderController(PluginBase, WidgetContentController) {

    /**
     * Define header controller
     * @class HeaderController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var HeaderController = function HeaderController() {
    };

    return HeaderController.extend('HeaderController', {

        /**
         * Set embedded content
         * @memberOf HeaderController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$header.renderEmbeddedContent();
        },

        /**
         * Add Header rule
         * @memberOf HeaderController
         * @param {Event} e
         */
        addHeaderRule: function addHeaderRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});