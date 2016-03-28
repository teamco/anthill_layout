/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineFlickrController(PluginBase, WidgetContentController) {

    /**
     * Define Flickr controller
     * @class FlickrController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FlickrController = function FlickrController() {
    };

    return FlickrController.extend('FlickrController', {

        /**
         * Set embedded content
         * @memberOf FlickrController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$flickr.renderEmbeddedContent(
                this.model.getPrefs('flickrEmbed')
            );
        },

        /**
         * Add Flickr rule
         * @memberOf FlickrController
         * @param e
         */
        addFlickrRule: function addFlickrRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
