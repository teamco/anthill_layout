/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineGooglePresentationController(PluginBase, WidgetContentController) {

    /**
     * Define GooglePresentation controller
     * @class GooglePresentationController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var GooglePresentationController = function GooglePresentationController() {
    };

    return GooglePresentationController.extend('GooglePresentationController', {

        /**
         * Set embedded content
         * @member GooglePresentationController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$googlepresentation.renderEmbeddedContent(
                this.model.getPrefs('googlepresentationEmbed')
            );
        },

        /**
         * Add GooglePresentation rule
         * @member GooglePresentationController
         * @param e
         */
        addGooglePresentationRule: function addGooglePresentationRule(e) {

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
