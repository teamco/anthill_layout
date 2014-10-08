/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/flickr/element/flickr.element',
    'plugins/widgets/flickr/element/flickr.preferences.element',
    'plugins/widgets/flickr/element/flickr.rules.element'
], function defineFlickrView(BaseView, Header, Footer, FlickrElement, FlickrPreferencesElement, FlickrRulesElement) {

    /**
     * Define view
     * @class FlickrView
     * @extends BaseView
     * @constructor
     */
    var FlickrView = function FlickrView() {
    };

    return FlickrView.extend('FlickrView', {

        /**
         * Render Flickr element
         * @member FlickrView
         */
        renderFlickr: function renderFlickr() {

            this.header(Header, this.elements.$container);

            /**
             * Define $flickr
             * @type {FlickrElement}
             */
            this.elements.$flickr = new FlickrElement(this, {
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
         * @member FlickrView
         * @returns {FlickrPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Flickr Preferences Element
             * @type {FlickrPreferencesElement}
             */
            this.elements.$preferences = new FlickrPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member FlickrView
         * @param widgetRules
         * @param contentRules
         * @returns {FlickrRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Flickr Rules Element
             * @type {FlickrRulesElement}
             */
            this.elements.$rules = new FlickrRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render Flickr
         * @member FlickrView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderFlickr.bind(this)
            );
        }

    }, BaseView.prototype)

});
