/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineLoginFacebookController(PluginBase, WidgetContentController) {

    /**
     * Define loginfb controller
     * @class LoginFacebookController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LoginFacebookController = function LoginFacebookController() {
    };

    return LoginFacebookController.extend('LoginFacebookController', {

        /**
         * Set embedded content
         * @memberOf LoginFacebookController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$loginfacebook.renderEmbeddedContent();
        },

        /**
         * Add LoginFacebook rule
         * @memberOf LoginFacebookController
         * @param e
         */
        addLoginFacebookRule: function addLoginFacebookRule(e) {

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