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
    'plugins/widgets/mus.tv/element/mus.tv.element',
    'plugins/widgets/mus.tv/element/mus.tv.preferences.element',
    'plugins/widgets/mus.tv/element/mus.tv.rules.element'
], function defineMusTvView(BaseView, Header, Footer, MusTvElement, MusTvPreferencesElement, MusTvRulesElement) {

    /**
     * Define view
     * @class MusTvView
     * @extends BaseView
     * @constructor
     */
    var MusTvView = function MusTvView() {
    };

    return MusTvView.extend('MusTvView', {

        /**
         * Render mustv element
         * @member MusTvView
         */
        renderMusTv: function renderMusTv() {

            this.header(Header, this.elements.$container);

            /**
             * Define $mustv
             * @type {MusTvElement}
             */
            this.elements.$mustv = new MusTvElement(this, {
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
         * @member MusTvView
         * @returns {MusTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define MusTv Preferences Element
             * @type {MusTvPreferencesElement}
             */
            this.elements.$preferences = new MusTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member MusTvView
         * @param widgetRules
         * @param contentRules
         * @returns {MusTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define MusTv Rules Element
             * @type {MusTvRulesElement}
             */
            this.elements.$rules = new MusTvRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render mustv
         * @member MusTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderMusTv.bind(this)
            );
        }

    }, BaseView.prototype)

});
