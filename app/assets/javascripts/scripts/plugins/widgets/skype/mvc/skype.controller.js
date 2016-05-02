/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSkypeController(PluginBase, WidgetContentController) {

    /**
     * Define Skype controller
     * @class SkypeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SkypeController = function SkypeController() {
    };

    return SkypeController.extend('SkypeController', {

        /**
         * Set embedded content
         * @memberOf SkypeController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('skypeBootstrap'),
                this.model.getPrefs('skypeApiKey'),
                this.model.getPrefs('skypeUiKey')
            );
        },

        /**
         * Add Skype rule
         * @memberOf SkypeController
         * @param e
         */
        addSkypeRule: function addSkypeRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Skype|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
