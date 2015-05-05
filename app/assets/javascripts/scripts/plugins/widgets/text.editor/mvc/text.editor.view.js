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
    'plugins/widgets/text.editor/element/text.editor.element',
    'plugins/widgets/text.editor/element/text.editor.preferences.element',
    'plugins/widgets/text.editor/element/text.editor.rules.element'
], function defineTextEditorView(BaseView, Header, Footer, TextEditorElement, TextEditorPreferencesElement, TextEditorRulesElement) {

    /**
     * Define view
     * @class TextEditorView
     * @extends BaseView
     * @constructor
     */
    var TextEditorView = function TextEditorView() {
    };

    return TextEditorView.extend('TextEditorView', {

        /**
         * Render text editor element
         * @memberOf TextEditorView
         */
        renderTextEditor: function renderTextEditor() {

            this.header(Header, this.elements.$container);

            /**
             * Define $text.editor
             * @type {TextEditorElement}
             */
            this.elements.$texteditor = new TextEditorElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventManager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf TextEditorView
         * @returns {TextEditorPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TextEditor Preferences Element
             * @type {TextEditorPreferencesElement}
             */
            this.elements.$preferences = new TextEditorPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf TextEditorView
         * @param widgetRules
         * @param contentRules
         * @returns {TextEditorRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define TextEditor Rules Element
             * @type {TextEditorRulesElement}
             */
            this.elements.$rules = new TextEditorRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render text.editor
         * @memberOf TextEditorView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderTextEditor.bind(this)
            );
        }

    }, BaseView.prototype)

});