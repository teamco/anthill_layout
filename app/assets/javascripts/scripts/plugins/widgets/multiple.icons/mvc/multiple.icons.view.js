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
    'plugins/widgets/multiple.icons/element/multiple.icons.element',
    'plugins/widgets/multiple.icons/element/multiple.icons.preferences.element',
    'plugins/widgets/multiple.icons/element/multiple.icons.rules.element'
], function defineMultipleIconsView(BaseView, Header, Footer, MultipleIconsElement, MultipleIconsPreferencesElement, MultipleIconsRulesElement) {

    /**
     * Define view
     * @class MultipleIconsView
     * @extends BaseView
     * @constructor
     */
    var MultipleIconsView = function MultipleIconsView() {
    };

    return MultipleIconsView.extend('MultipleIconsView', {

        /**
         * Render multiple.icons element
         * @member MultipleIconsView
         */
        renderMultipleIcons: function renderMultipleIcons() {

            this.header(Header, this.elements.$container);

            /**
             * Define $multipleicons
             * @type {MultipleIconsElement}
             */
            this.elements.$multipleicons = new MultipleIconsElement(this, {
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
         * @member MultipleIconsView
         * @returns {MultipleIconsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define MultipleIcons Preferences Element
             * @type {MultipleIconsPreferencesElement}
             */
            this.elements.$preferences = new MultipleIconsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member MultipleIconsView
         * @param widgetRules
         * @param contentRules
         * @returns {MultipleIconsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define MultipleIcons Rules Element
             * @type {MultipleIconsRulesElement}
             */
            this.elements.$rules = new MultipleIconsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render multiple.icons
         * @member MultipleIconsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderMultipleIcons.bind(this)
            );
        }

    }, BaseView.prototype)

});