/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineCoubController(PluginBase, WidgetContentController) {

    /**
     * Define Coub controller
     * @class CoubController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var CoubController = function CoubController() {
    };

    return CoubController.extend('CoubController', {

        /**
         * Set embedded content
         * @member CoubController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$coub.renderEmbeddedContent({
                link: this.model.getPrefs('coubLink'),
                start: this.model.getPrefs('coubAutoStart'),
                mute: this.model.getPrefs('coubMute'),
                hide: this.model.getPrefs('coubHideTopBar'),
                hd: this.model.getPrefs('coubStartWithHighDefinition')
            });
        },

        /**
         * Add Coub rule
         * @member CoubController
         * @param e
         */
        addCoubRule: function addCoubRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
