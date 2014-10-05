/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineGooglePlusController(PluginBase, WidgetContentController) {

    /**
     * Define GooglePlus controller
     * @class GooglePlusController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var GooglePlusController = function GooglePlusController() {
    };

    return GooglePlusController.extend('GooglePlusController', {

        /**
         * Set embedded content
         * @member GooglePlusController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$googleplus.renderEmbeddedContent(
                this.model.getPrefs('googlePlusApi'),
                this.model.getPrefs('googlePlusUrl')
            );
        },

        /**
         * Add GooglePlus rule
         * @member GooglePlusController
         * @param e
         */
        addGooglePlusRule: function addGooglePlusRule(e) {

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
