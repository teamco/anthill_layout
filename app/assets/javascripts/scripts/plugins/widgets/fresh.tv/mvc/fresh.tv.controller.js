/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineFreshTvController(PluginBase, WidgetContentController) {

    /**
     * Define freshtv controller
     * @class FreshTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FreshTvController = function FreshTvController() {
    };

    return FreshTvController.extend('FreshTvController', {

        /**
         * Set embedded content
         * @member FreshTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$freshtv.renderEmbeddedContent(
                this.model.getPrefs('freshtvEmbedCode')
            );
        },

        /**
         * Add FreshTv rule
         * @member FreshTvController
         * @param e
         */
        addFreshTvRule: function addFreshTvRule(e) {

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
