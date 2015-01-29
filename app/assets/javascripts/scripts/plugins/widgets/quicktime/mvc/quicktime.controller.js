/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineQuicktimeController(PluginBase, WidgetContentController) {

    /**
     * Define quicktime controller
     * @class QuicktimeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var QuicktimeController = function QuicktimeController() {
    };

    return QuicktimeController.extend('QuicktimeController', {

        /**
         * Set embedded content
         * @member QuicktimeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$quicktime.renderEmbeddedContent(
                this.model.getPrefs('quicktimeUrl')
            );
        },

        /**
         * Add Quicktime rule
         * @member QuicktimeController
         * @param e
         */
        addQuicktimeRule: function addQuicktimeRule(e) {

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