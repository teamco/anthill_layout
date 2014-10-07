/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineVineCoController(PluginBase, WidgetContentController) {

    /**
     * Define VineCo controller
     * @class VineCoController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var VineCoController = function VineCoController() {
    };

    return VineCoController.extend('VineCoController', {

        /**
         * Set embedded content
         * @member VineCoController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$vineco.renderEmbeddedContent({
                api: this.model.getPrefs('vinecoApi'),
                link: this.model.getPrefs('vinecoLink'),
                postcard: this.model.getPrefs('vinecoPostcard'),
                audio: this.model.getPrefs('vinecoAutoplayAudio'),
                video: this.model.getPrefs('vinecoRelatedVideos')
            });
        },

        /**
         * Add VineCo rule
         * @member VineCoController
         * @param e
         */
        addVineCoRule: function addVineCoRule(e) {

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