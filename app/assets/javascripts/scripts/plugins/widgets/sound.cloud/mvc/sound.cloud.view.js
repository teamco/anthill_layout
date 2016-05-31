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
    'plugins/widgets/sound.cloud/element/sound.cloud.element',
    'plugins/widgets/sound.cloud/element/sound.cloud.preferences.element',
    'plugins/widgets/sound.cloud/element/sound.cloud.rules.element'
], function defineSoundCloudView(BaseView, Header, Footer, SoundCloudElement, SoundCloudPreferencesElement, SoundCloudRulesElement) {

    /**
     * Define view
     * @class SoundCloudView
     * @extends BaseView
     * @constructor
     */
    var SoundCloudView = function SoundCloudView() {
    };

    return SoundCloudView.extend('SoundCloudView', {

        /**
         * Render soundcloud element
         * @memberOf SoundCloudView
         */
        renderSoundCloud: function renderSoundCloud() {

            this.header(Header, this.get$container());

            /**
             * Define $soundcloud
             * @type {SoundCloudElement}
             */
            this.elements.$soundcloud = new SoundCloudElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SoundCloudView
         * @returns {SoundCloudPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SoundCloud Preferences Element
             * @type {SoundCloudPreferencesElement}
             */
            this.elements.$preferences = new SoundCloudPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf SoundCloudView
         * @param widgetRules
         * @param contentRules
         * @returns {SoundCloudRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define SoundCloud Rules Element
             * @type {SoundCloudRulesElement}
             */
            this.elements.$rules = new SoundCloudRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render soundcloud
         * @memberOf SoundCloudView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSoundCloud.bind(this)
            );
        }

    }, BaseView.prototype)

});
