/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineDipityController(PluginBase, WidgetContentController) {

    /**
     * Define Dipity controller
     * @class DipityController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var DipityController = function DipityController() {
    };

    return DipityController.extend('DipityController', {

        /**
         * Set embedded content
         * @memberOf DipityController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('dipityEmbedCode')
            );
        },

        /**
         * Add Dipity rule
         * @memberOf DipityController
         * @param e
         */
        addDipityRule: function addDipityRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Dipity|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
