/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineMetamorphicController(PluginBase, WidgetContentController) {

    /**
     * Define Metamorphic controller
     * @class MetamorphicController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MetamorphicController = function MetamorphicController() {
    };

    return MetamorphicController.extend('MetamorphicController', {

        /**
         * Set embedded content
         * @memberOf MetamorphicController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add Metamorphic rule
         * @memberOf MetamorphicController
         * @param {Event} e
         */
        addMetamorphicRule: function addMetamorphicRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Metamorphic|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
