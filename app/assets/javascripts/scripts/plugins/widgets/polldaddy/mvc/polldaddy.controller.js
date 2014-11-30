/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePolldaddyController(PluginBase, WidgetContentController) {

    /**
     * Define polldaddy controller
     * @class PolldaddyController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PolldaddyController = function PolldaddyController() {
    };

    return PolldaddyController.extend('PolldaddyController', {

        /**
         * Set embedded content
         * @member PolldaddyController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$polldaddy.renderEmbeddedContent(
                this.model.getPrefs('polldaddyEmbedCode')
            );
        },

        /**
         * Add Polldaddy rule
         * @member PolldaddyController
         * @param e
         */
        addPolldaddyRule: function addPolldaddyRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
