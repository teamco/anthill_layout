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
    'plugins/widgets/spankwire/element/spankwire.element',
    'plugins/widgets/spankwire/element/spankwire.preferences.element',
    'plugins/widgets/spankwire/element/spankwire.rules.element'
], function defineSpankwireView(BaseView, Header, Footer, SpankwireElement, SpankwirePreferencesElement, SpankwireRulesElement) {

    /**
     * Define view
     * @class SpankwireView
     * @extends BaseView
     * @constructor
     */
    var SpankwireView = function SpankwireView() {
    };

    return SpankwireView.extend('SpankwireView', {

        /**
         * Render spankwire element
         * @member SpankwireView
         */
        renderSpankwire: function renderSpankwire() {

            this.header(Header, this.elements.$container);

            /**
             * Define $spankwire
             * @type {SpankwireElement}
             */
            this.elements.$spankwire = new SpankwireElement(this, {
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
         * @member SpankwireView
         * @returns {SpankwirePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Spankwire Preferences Element
             * @type {SpankwirePreferencesElement}
             */
            this.elements.$preferences = new SpankwirePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member SpankwireView
         * @param widgetRules
         * @param contentRules
         * @returns {SpankwireRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Spankwire Rules Element
             * @type {SpankwireRulesElement}
             */
            this.elements.$rules = new SpankwireRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render spankwire
         * @member SpankwireView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSpankwire.bind(this)
            );
        }

    }, BaseView.prototype)

});
