/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineFilmOnController(PluginBase, WidgetContentController) {

    /**
     * Define FilmOn controller
     * @class FilmOnController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FilmOnController = function FilmOnController() {
    };

    return FilmOnController.extend('FilmOnController', {

        /**
         * Set embedded content
         * @member FilmOnController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Load config
             * @type {*}
             */
            var mask = this.model.getConfig('mask'),
                channel = this.model.getPrefs('filmonChannelId');

            if (channel) {
                this.view.elements.$filmon.renderEmbeddedContent(
                    mask.replace(/\{channel}/, channel)
                );
            }
        },

        /**
         * Add FilmOn rule
         * @member FilmOnController
         * @param e
         */
        addFilmOnRule: function addFilmOnRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
