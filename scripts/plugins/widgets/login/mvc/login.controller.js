/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineLoginController(PluginBase, WidgetContentController) {

    /**
     * Define login controller
     * @class LoginController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LoginController = function LoginController() {
    };

    return LoginController.extend('LoginController', {

        /**
         * Set embedded content
         * @member LoginController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$login.renderEmbeddedContent();
        },

        /**
         * Add Login rule
         * @member LoginController
         * @param e
         */
        addLoginRule: function addLoginRule(e) {

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