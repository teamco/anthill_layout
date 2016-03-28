/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineTwitsController(PluginBase, WidgetContentController) {

    /**
     * Define twits controller
     * @class TwitsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TwitsController = function TwitsController() {
    };

    return TwitsController.extend('TwitsController', {

        /**
         * Set embedded content
         * @memberOf TwitsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$twits.renderEmbeddedContent({
                twitsWidgetId: this.model.getPrefs('twitsWidgetId'),
                maximumNumberOfTweets: this.model.getPrefs('maximumNumberOfTweets'),
                showHashAsLink: this.model.getPrefs('showHashAsLink'),
                showPhoto: this.model.getPrefs('showPhoto'),
                showTime: this.model.getPrefs('showTime'),
                showRetweets: this.model.getPrefs('showRetweets')
            });
        },

        /**
         * Add Twits rule
         * @memberOf TwitsController
         * @param e
         */
        addTwitsRule: function addTwitsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});