/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineVerseController(PluginBase, WidgetContentController) {

    /**
     * Define Verse controller
     * @class VerseController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var VerseController = function VerseController() {
    };

    return VerseController.extend('VerseController', {

        /**
         * Set embedded content
         * @memberOf VerseController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('verseEmbedCode')
            );
        },

        /**
         * Add Verse rule
         * @memberOf VerseController
         * @param e
         */
        addVerseRule: function addVerseRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Verse|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
