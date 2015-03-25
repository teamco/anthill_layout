/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineFirePicController(PluginBase, WidgetContentController) {

    /**
     * Define firepic controller
     * @class FirePicController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FirePicController = function FirePicController() {
    };

    return FirePicController.extend('FirePicController', {

        /**
         * Set embedded content
         * @member FirePicController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$firepic.renderEmbeddedContent(
                this.model.getPrefs('firepicUrl')
            );
        },

        /**
         * Add FirePic rule
         * @member FirePicController
         * @param e
         */
        addFirePicRule: function addFirePicRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
