/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePosttoolController(PluginBase, WidgetContentController) {

    /**
     * Define posttool controller
     * @class PosttoolController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PosttoolController = function PosttoolController() {
    };

    return PosttoolController.extend('PosttoolController', {

        /**
         * Set embedded content
         * @member PosttoolController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$posttool.renderEmbeddedContent();
        },

        /**
         * Add Posttool rule
         * @member PosttoolController
         * @param e
         */
        addPosttoolRule: function addPosttoolRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});