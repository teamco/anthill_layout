/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineOvvaTvController(PluginBase, WidgetContentController) {

    /**
     * Define OvvaTv controller
     * @class OvvaTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OvvaTvController = function OvvaTvController() {
    };

    return OvvaTvController.extend('OvvaTvController', {

        /**
         * Set embedded content
         * @memberOf OvvaTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('ovvatvEmbedCode')
            );
        },

        /**
         * Add OvvaTv rule
         * @memberOf OvvaTvController
         * @param e
         */
        addOvvaTvRule: function addOvvaTvRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {OvvaTv|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
