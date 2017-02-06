/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineOneHdRuController(PluginBase, WidgetContentController) {

    /**
     * Define onehdru controller
     * @class OneHdRuController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OneHdRuController = function OneHdRuController() {
    };

    return OneHdRuController.extend('OneHdRuController', {

        /**
         * Set embedded content
         * @memberOf OneHdRuController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$onehdru.renderEmbeddedContent(
                this.model.getPrefs('onehdruEmbedCode')
            );
        },

        /**
         * Add OneHdRu rule
         * @memberOf OneHdRuController
         * @param {Event} e
         */
        addOneHdRuRule: function addOneHdRuRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
