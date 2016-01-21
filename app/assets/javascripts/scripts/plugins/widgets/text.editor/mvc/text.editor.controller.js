/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTextEditorController(PluginBase, WidgetContentController) {

    /**
     * Define empty controller
     * @class TextEditorController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TextEditorController = function TextEditorController() {
    };

    return TextEditorController.extend('TextEditorController', {

        /**
         * Set embedded content
         * @memberOf TextEditorController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('bodyHtml')
            );
        },

        /**
         * Add TextEditor rule
         * @memberOf TextEditorController
         * @param e
         */
        addTextEditorRule: function addTextEditorRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});