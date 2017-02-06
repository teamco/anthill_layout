/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSportboxRuController(PluginBase, WidgetContentController) {

    /**
     * Define SportboxRu controller
     * @class SportboxRuController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SportboxRuController = function SportboxRuController() {
    };

    return SportboxRuController.extend('SportboxRuController', {

        /**
         * Set embedded content
         * @memberOf SportboxRuController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('sportboxEmbedCode')
            );
        },

        /**
         * Add SportboxRu rule
         * @memberOf SportboxRuController
         * @param {Event} e
         */
        addSportboxRuRule: function addSportboxRuRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {SportboxRu|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
