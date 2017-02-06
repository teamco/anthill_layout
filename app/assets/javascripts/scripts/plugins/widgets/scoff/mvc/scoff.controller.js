/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineScoffController(PluginBase, WidgetContentController) {

    /**
     * Define Scoff controller
     * @class ScoffController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ScoffController = function ScoffController() {
    };

    return ScoffController.extend('ScoffController', {

        /**
         * Set embedded content
         * @memberOf ScoffController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('scoffEmbedCode')
            );
        },

        /**
         * Add Scoff rule
         * @memberOf ScoffController
         * @param {Event} e
         */
        addScoffRule: function addScoffRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Scoff|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
