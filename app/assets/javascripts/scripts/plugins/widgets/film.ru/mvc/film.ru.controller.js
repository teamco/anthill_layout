/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineFilmRuController(PluginBase, WidgetContentController) {

    /**
     * Define FilmRu controller
     * @class FilmRuController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FilmRuController = function FilmRuController() {
    };

    return FilmRuController.extend('FilmRuController', {

        /**
         * Set embedded content
         * @memberOf FilmRuController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('filmruEmbedCode')
            );
        },

        /**
         * Add FilmRu rule
         * @memberOf FilmRuController
         * @param e
         */
        addFilmRuRule: function addFilmRuRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {FilmRu|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
