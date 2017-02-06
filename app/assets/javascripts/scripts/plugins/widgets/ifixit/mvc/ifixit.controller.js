/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineIfixitController(PluginBase, WidgetContentController) {

    /**
     * Define Ifixit controller
     * @class IfixitController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var IfixitController = function IfixitController() {
    };

    return IfixitController.extend('IfixitController', {

        /**
         * Set embedded content
         * @memberOf IfixitController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('ifixitEmbedCode')
            );
        },

        /**
         * Add Ifixit rule
         * @memberOf IfixitController
         * @param {Event} e
         */
        addIfixitRule: function addIfixitRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Ifixit|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
