/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineTitleController(PluginBase, WidgetContentController) {

    /**
     * Define Title controller
     * @class TitleController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TitleController = function TitleController() {
    };

    return TitleController.extend('TitleController', {

        /**
         * Set embedded content
         * @memberOf TitleController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('titleText')
            );
        },

        /**
         * Add Title rule
         * @memberOf TitleController
         * @param e
         */
        addTitleRule: function addTitleRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Title|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
