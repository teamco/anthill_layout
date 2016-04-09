/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineTinymceController(PluginBase, WidgetContentController) {

    /**
     * Define Tinymce controller
     * @class TinymceController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TinymceController = function TinymceController() {
    };

    return TinymceController.extend('TinymceController', {

        /**
         * Set embedded content
         * @memberOf TinymceController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('tinymceContent')
            );
        },

        /**
         * Add Tinymce rule
         * @memberOf TinymceController
         * @param e
         */
        addTinymceRule: function addTinymceRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Tinymce|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
