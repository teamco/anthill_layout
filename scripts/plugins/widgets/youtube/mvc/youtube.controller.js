/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineYoutubeController(PluginBase, WidgetBase) {

    /**
     * Define youtube controller
     * @class YoutubeController
     * @extends PluginController
     * @extends WidgetController
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
                this.model.getUrl()
            );
        }

    }, PluginBase.prototype, WidgetBase.prototype);
});