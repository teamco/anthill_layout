/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
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
         * @memberOf FreshTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$freshtv.renderEmbeddedContent(
                this.model.getPrefs('freshtvEmbedCode')
            );
        },

        /**
         * Add FreshTv rule
         * @memberOf FreshTvController
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
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
