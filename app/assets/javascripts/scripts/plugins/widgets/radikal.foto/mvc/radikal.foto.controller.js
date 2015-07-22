/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineRadikalFotoController(PluginBase, WidgetContentController) {

    /**
     * Define radikalfoto controller
     * @class RadikalFotoController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var RadikalFotoController = function RadikalFotoController() {
    };

    return RadikalFotoController.extend('RadikalFotoController', {

        /**
         * Set embedded content
         * @memberOf RadikalFotoController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$radikalfoto.renderEmbeddedContent(
                this.model.getPrefs('radikalfotoUrl')
            );
        },

        /**
         * Add RadikalFoto rule
         * @memberOf RadikalFotoController
         * @param e
         */
        addRadikalFotoRule: function addRadikalFotoRule(e) {

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
