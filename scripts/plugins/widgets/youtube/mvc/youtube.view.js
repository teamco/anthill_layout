/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/youtube/element/youtube.element',
    'plugins/widgets/youtube/element/youtube.preferences.element'
], function defineYoutubeView(BaseView, Header, Footer, YoutubeElement, YoutubePreferencesElement) {

    /**
     * Define view
     * @class View
     * @extends BaseView
     * @constructor
     */
    var View = function View() {
    };

    return View.extend({

        /**
         * Render youtube element
         * @member View
         */
        renderYoutube: function renderYoutube() {

            this.header(Header, this.elements.$container);

            /**
             * Define $youtube
             * @type {YoutubeElement}
             */
            this.elements.$youtube = new YoutubeElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member View
         * @returns {YoutubePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            this.elements.$preferences = new YoutubePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render youtube
         * @member View
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderYoutube.bind(this)
            );
        }

    }, BaseView.prototype)

});