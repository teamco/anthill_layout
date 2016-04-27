/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineOfficeMixController(PluginBase, WidgetContentController) {

    /**
     * Define OfficeMix controller
     * @class OfficeMixController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OfficeMixController = function OfficeMixController() {
    };

    return OfficeMixController.extend('OfficeMixController', {

        /**
         * Set embedded content
         * @memberOf OfficeMixController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('officemixEmbedCode')
            );
        },

        /**
         * Add OfficeMix rule
         * @memberOf OfficeMixController
         * @param e
         */
        addOfficeMixRule: function addOfficeMixRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {OfficeMix|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
