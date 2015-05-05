/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePhotobucketController(PluginBase, WidgetContentController) {

    /**
     * Define photobucket controller
     * @class PhotobucketController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PhotobucketController = function PhotobucketController() {
    };

    return PhotobucketController.extend('PhotobucketController', {

        /**
         * Set embedded content
         * @memberOf PhotobucketController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$photobucket.renderEmbeddedContent(
                this.model.getPrefs('photobucketEmbedCode')
            );
        },

        /**
         * Add Photobucket rule
         * @memberOf PhotobucketController
         * @param e
         */
        addPhotobucketRule: function addPhotobucketRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventManager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
