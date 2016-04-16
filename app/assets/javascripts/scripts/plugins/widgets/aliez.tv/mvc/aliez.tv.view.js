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
    'plugins/widgets/aliez.tv/element/aliez.tv.element',
    'plugins/widgets/aliez.tv/element/aliez.tv.preferences.element',
    'plugins/widgets/aliez.tv/element/aliez.tv.rules.element'
], function defineAliezTvView(BaseView, Header, Footer, AliezTvElement, AliezTvPreferencesElement, AliezTvRulesElement) {

    /**
     * Define view
     * @class AliezTvView
     * @extends BaseView
     * @constructor
     */
    var AliezTvView = function AliezTvView() {
    };

    return AliezTvView.extend('AliezTvView', {

        /**
         * Render AliezTv element
         * @memberOf AliezTvView
         */
        renderAliezTv: function renderAliezTv() {

            this.header(Header, this.get$container());

            /**
             * Define $alieztv
             * @type {AliezTvElement}
             */
            this.elements.$alieztv = new AliezTvElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf AliezTvView
         * @returns {AliezTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define AliezTv Preferences Element
             * @type {AliezTvPreferencesElement}
             */
            this.elements.$preferences = new AliezTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf AliezTvView
         * @param widgetRules
         * @param contentRules
         * @returns {AliezTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define AliezTv Rules Element
             * @type {AliezTvRulesElement}
             */
            this.elements.$rules = new AliezTvRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render AliezTv
         * @memberOf AliezTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderAliezTv.bind(this)
            );
        }

    }, BaseView.prototype);
});
