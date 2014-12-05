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
    'plugins/widgets/fapa.tv/element/fapa.tv.element',
    'plugins/widgets/fapa.tv/element/fapa.tv.preferences.element',
    'plugins/widgets/fapa.tv/element/fapa.tv.rules.element'
], function defineFapaTvView(BaseView, Header, Footer, FapaTvElement, FapaTvPreferencesElement, FapaTvRulesElement) {

    /**
     * Define view
     * @class FapaTvView
     * @extends BaseView
     * @constructor
     */
    var FapaTvView = function FapaTvView() {
    };

    return FapaTvView.extend('FapaTvView', {

        /**
         * Render fapatv element
         * @member FapaTvView
         */
        renderFapaTv: function renderFapaTv() {

            this.header(Header, this.elements.$container);

            /**
             * Define $fapatv
             * @type {FapaTvElement}
             */
            this.elements.$fapatv = new FapaTvElement(this, {
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
         * @member FapaTvView
         * @returns {FapaTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define FapaTv Preferences Element
             * @type {FapaTvPreferencesElement}
             */
            this.elements.$preferences = new FapaTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member FapaTvView
         * @param widgetRules
         * @param contentRules
         * @returns {FapaTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define FapaTv Rules Element
             * @type {FapaTvRulesElement}
             */
            this.elements.$rules = new FapaTvRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render fapatv
         * @member FapaTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderFapaTv.bind(this)
            );
        }

    }, BaseView.prototype)

});
