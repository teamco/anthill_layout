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
    'plugins/widgets/espreso.tv/element/espreso.tv.element',
    'plugins/widgets/espreso.tv/element/espreso.tv.preferences.element',
    'plugins/widgets/espreso.tv/element/espreso.tv.rules.element'
], function defineEspresoTvView(BaseView, Header, Footer, EspresoTvElement, EspresoTvPreferencesElement, EspresoTvRulesElement) {

    /**
     * Define view
     * @class EspresoTvView
     * @extends BaseView
     * @constructor
     */
    var EspresoTvView = function EspresoTvView() {
    };

    return EspresoTvView.extend('EspresoTvView', {

        /**
         * Render espresotv element
         * @member EspresoTvView
         */
        renderEspresoTv: function renderEspresoTv() {

            this.header(Header, this.elements.$container);

            /**
             * Define $espresotv
             * @type {EspresoTvElement}
             */
            this.elements.$espresotv = new EspresoTvElement(this, {
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
         * @member EspresoTvView
         * @returns {EspresoTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define EspresoTv Preferences Element
             * @type {EspresoTvPreferencesElement}
             */
            this.elements.$preferences = new EspresoTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member EspresoTvView
         * @param widgetRules
         * @param contentRules
         * @returns {EspresoTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define EspresoTv Rules Element
             * @type {EspresoTvRulesElement}
             */
            this.elements.$rules = new EspresoTvRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render espresotv
         * @member EspresoTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderEspresoTv.bind(this)
            );
        }

    }, BaseView.prototype)

});
