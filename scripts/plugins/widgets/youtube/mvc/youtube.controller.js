/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineYoutubeController(PluginBase, WidgetContentController) {

    /**
     * Define youtube controller
     * @class YoutubeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var YoutubeController = function YoutubeController() {
    };

    return YoutubeController.extend('YoutubeController', {

        /**
         * Set embedded content
         * @member YoutubeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$youtube.renderEmbeddedContent(
                this.model.getPrefs('youtubeUrl')
            );
        },

        /**
         * Add Youtube rule
         * @member YoutubeController
         * @param e
         */
        addYoutubeRule: function addYoutubeRule(e) {

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