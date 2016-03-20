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
    'plugins/widgets/some.ecards/element/some.ecards.element',
    'plugins/widgets/some.ecards/element/some.ecards.preferences.element',
    'plugins/widgets/some.ecards/element/some.ecards.rules.element'
], function defineSomeEcardsView(BaseView, Header, Footer, SomeEcardsElement, SomeEcardsPreferencesElement, SomeEcardsRulesElement) {

    /**
     * Define view
     * @class SomeEcardsView
     * @extends BaseView
     * @constructor
     */
    var SomeEcardsView = function SomeEcardsView() {
    };

    return SomeEcardsView.extend('SomeEcardsView', {

        /**
         * Render someecards element
         * @memberOf SomeEcardsView
         */
        renderSomeEcards: function renderSomeEcards() {

            this.header(Header, this.getElementContainer());

            /**
             * Define $someecards
             * @type {SomeEcardsElement}
             */
            this.elements.$someecards = new SomeEcardsElement(this, {
                $container: this.get$container(),
                id: this.createUUID()
            });

            this.footer(Footer, this.getElementContainer());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SomeEcardsView
         * @returns {SomeEcardsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SomeEcards Preferences Element
             * @type {SomeEcardsPreferencesElement}
             */
            this.elements.$preferences = new SomeEcardsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf SomeEcardsView
         * @param widgetRules
         * @param contentRules
         * @returns {SomeEcardsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define SomeEcards Rules Element
             * @type {SomeEcardsRulesElement}
             */
            this.elements.$rules = new SomeEcardsRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render someecards
         * @memberOf SomeEcardsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSomeEcards.bind(this)
            );
        }

    }, BaseView.prototype)

});
