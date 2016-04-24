/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineFacebookEmbeddedPostsController(PluginBase, WidgetContentController) {

    /**
     * Define FacebookEmbeddedPosts controller
     * @class FacebookEmbeddedPostsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FacebookEmbeddedPostsController = function FacebookEmbeddedPostsController() {
    };

    return FacebookEmbeddedPostsController.extend('FacebookEmbeddedPostsController', {

        /**
         * Set embedded content
         * @memberOf FacebookEmbeddedPostsController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('facebookembeddedpostsEmbedCode')
            );
        },

        /**
         * Add FacebookEmbeddedPosts rule
         * @memberOf FacebookEmbeddedPostsController
         * @param e
         */
        addFacebookEmbeddedPostsRule: function addFacebookEmbeddedPostsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {FacebookEmbeddedPosts|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
