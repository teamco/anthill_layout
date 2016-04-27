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
    'plugins/widgets/huffduffer/element/huffduffer.element',
    'plugins/widgets/huffduffer/element/huffduffer.preferences.element',
    'plugins/widgets/huffduffer/element/huffduffer.rules.element'
], function defineHuffdufferView(BaseView, Header, Footer, HuffdufferElement, HuffdufferPreferencesElement, HuffdufferRulesElement) {

    /**
     * Define view
     * @class HuffdufferView
     * @extends BaseView
     * @constructor
     */
    var HuffdufferView = function HuffdufferView() {
    };

    return HuffdufferView.extend('HuffdufferView', {

        /**
         * Render Huffduffer element
         * @memberOf HuffdufferView
         */
        renderHuffduffer: function renderHuffduffer() {

            this.header(Header, this.get$container());

            /**
             * Define $huffduffer
             * @type {HuffdufferElement}
             */
            this.elements.$huffduffer = new HuffdufferElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf HuffdufferView
         * @returns {HuffdufferPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Huffduffer Preferences Element
             * @type {HuffdufferPreferencesElement}
             */
            this.elements.$preferences = new HuffdufferPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf HuffdufferView
         * @param widgetRules
         * @param contentRules
         * @returns {HuffdufferRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Huffduffer Rules Element
             * @type {HuffdufferRulesElement}
             */
            this.elements.$rules = new HuffdufferRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Huffduffer
         * @memberOf HuffdufferView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderHuffduffer.bind(this)
            );
        }

    }, BaseView.prototype);
});
