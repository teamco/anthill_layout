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
    'plugins/widgets/syntax.highlighter/element/syntax.highlighter.element',
    'plugins/widgets/syntax.highlighter/element/syntax.highlighter.preferences.element',
    'plugins/widgets/syntax.highlighter/element/syntax.highlighter.rules.element'
], function defineSyntaxHighlighterView(BaseView, Header, Footer, SyntaxHighlighterElement, SyntaxHighlighterPreferencesElement, SyntaxHighlighterRulesElement) {

    /**
     * Define view
     * @class SyntaxHighlighterView
     * @extends BaseView
     * @constructor
     */
    var SyntaxHighlighterView = function SyntaxHighlighterView() {
    };

    return SyntaxHighlighterView.extend('SyntaxHighlighterView', {

        /**
         * Render SyntaxHighlighter element
         * @memberOf SyntaxHighlighterView
         */
        renderSyntaxHighlighter: function renderSyntaxHighlighter() {

            this.header(Header, this.get$container());

            /**
             * Define $syntaxhighlighter
             * @type {SyntaxHighlighterElement}
             */
            this.elements.$syntaxhighlighter = new SyntaxHighlighterElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SyntaxHighlighterView
         * @returns {SyntaxHighlighterPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SyntaxHighlighter Preferences Element
             * @type {SyntaxHighlighterPreferencesElement}
             */
            this.elements.$preferences = new SyntaxHighlighterPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf SyntaxHighlighterView
         * @param widgetRules
         * @param contentRules
         * @returns {SyntaxHighlighterRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define SyntaxHighlighter Rules Element
             * @type {SyntaxHighlighterRulesElement}
             */
            this.elements.$rules = new SyntaxHighlighterRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render SyntaxHighlighter
         * @memberOf SyntaxHighlighterView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSyntaxHighlighter.bind(this)
            );
        }

    }, BaseView.prototype)

});
