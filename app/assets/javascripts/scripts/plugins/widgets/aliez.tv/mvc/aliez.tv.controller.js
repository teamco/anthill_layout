/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineAliezTvController(PluginBase, WidgetContentController) {

    /**
     * Define AliezTv controller
     * @class AliezTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var AliezTvController = function AliezTvController() {
    };

    return AliezTvController.extend('AliezTvController', {

        /**
         * Set embedded content
         * @memberOf AliezTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('alieztvEmbedCode')
            );
        },

        /**
         * Add AliezTv rule
         * @memberOf AliezTvController
         * @param e
         */
        addAliezTvRule: function addAliezTvRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {AliezTv|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
