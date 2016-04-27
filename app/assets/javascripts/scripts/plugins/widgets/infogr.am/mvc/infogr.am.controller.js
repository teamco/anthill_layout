/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineInfogrAmController(PluginBase, WidgetContentController) {

    /**
     * Define InfogrAm controller
     * @class InfogrAmController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var InfogrAmController = function InfogrAmController() {
    };

    return InfogrAmController.extend('InfogrAmController', {

        /**
         * Set embedded content
         * @memberOf InfogrAmController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('infogramEmbedCode')
            );
        },

        /**
         * Add InfogrAm rule
         * @memberOf InfogrAmController
         * @param e
         */
        addInfogrAmRule: function addInfogrAmRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {InfogrAm|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
