/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineInterludeController(PluginBase, WidgetContentController) {

    /**
     * Define Interlude controller
     * @class InterludeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var InterludeController = function InterludeController() {
    };

    return InterludeController.extend('InterludeController', {

        /**
         * Set embedded content
         * @memberOf InterludeController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('interludeEmbedCode')
            );
        },

        /**
         * Add Interlude rule
         * @memberOf InterludeController
         * @param e
         */
        addInterludeRule: function addInterludeRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Interlude|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
