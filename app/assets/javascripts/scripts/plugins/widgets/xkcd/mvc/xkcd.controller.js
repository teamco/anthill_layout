/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineXkcdController(PluginBase, WidgetContentController) {

    /**
     * Define xkcd controller
     * @class XkcdController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var XkcdController = function XkcdController() {
    };

    return XkcdController.extend('XkcdController', {

        /**
         * Set embedded content
         * @memberOf XkcdController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$xkcd.renderEmbeddedContent(
                this.model.getPrefs('xkcdEmbedCode')
            );
        },

        /**
         * Add Xkcd rule
         * @memberOf XkcdController
         * @param {Event} e
         */
        addXkcdRule: function addXkcdRule(e) {

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
