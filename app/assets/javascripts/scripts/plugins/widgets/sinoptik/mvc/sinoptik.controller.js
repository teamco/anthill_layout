/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSinoptikController(PluginBase, WidgetContentController) {

    /**
     * Define Sinoptik controller
     * @class SinoptikController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SinoptikController = function SinoptikController() {
    };

    return SinoptikController.extend('SinoptikController', {

        /**
         * Set embedded content
         * @memberOf SinoptikController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('sinoptikEmbedCode')
            );
        },

        /**
         * Add Sinoptik rule
         * @memberOf SinoptikController
         * @param e
         */
        addSinoptikRule: function addSinoptikRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Sinoptik|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
