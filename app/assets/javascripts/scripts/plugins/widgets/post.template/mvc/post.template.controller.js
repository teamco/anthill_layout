/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePostTemplateController(PluginBase, WidgetContentController) {

    /**
     * Define post.template controller
     * @class PostTemplateController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PostTemplateController = function PostTemplateController() {
    };

    return PostTemplateController.extend('PostTemplateController', {

        /**
         * Set embedded content
         * @memberOf PostTemplateController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add PostTemplate rule
         * @memberOf PostTemplateController
         * @param e
         */
        addPostTemplateRule: function addPostTemplateRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});