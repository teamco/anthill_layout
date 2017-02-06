/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineVideopressController(PluginBase, WidgetContentController) {

    /**
     * Define Videopress controller
     * @class VideopressController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var VideopressController = function VideopressController() {
    };

    return VideopressController.extend('VideopressController', {

        /**
         * Set embedded content
         * @memberOf VideopressController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('videopressEmbedCode')
            );
        },

        /**
         * Add Videopress rule
         * @memberOf VideopressController
         * @param {Event} e
         */
        addVideopressRule: function addVideopressRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Videopress|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
