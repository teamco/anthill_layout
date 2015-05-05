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
    'plugins/widgets/yap.files/element/yap.files.element',
    'plugins/widgets/yap.files/element/yap.files.preferences.element',
    'plugins/widgets/yap.files/element/yap.files.rules.element'
], function defineYapFilesView(BaseView, Header, Footer, YapFilesElement, YapFilesPreferencesElement, YapFilesRulesElement) {

    /**
     * Define view
     * @class YapFilesView
     * @extends BaseView
     * @constructor
     */
    var YapFilesView = function YapFilesView() {
    };

    return YapFilesView.extend('YapFilesView', {

        /**
         * Render yapfiles element
         * @memberOf YapFilesView
         */
        renderYapFiles: function renderYapFiles() {

            this.header(Header, this.elements.$container);

            /**
             * Define $yapfiles
             * @type {YapFilesElement}
             */
            this.elements.$yapfiles = new YapFilesElement(this, {
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
         * @memberOf YapFilesView
         * @returns {YapFilesPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define YapFiles Preferences Element
             * @type {YapFilesPreferencesElement}
             */
            this.elements.$preferences = new YapFilesPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf YapFilesView
         * @param widgetRules
         * @param contentRules
         * @returns {YapFilesRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define YapFiles Rules Element
             * @type {YapFilesRulesElement}
             */
            this.elements.$rules = new YapFilesRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render yapfiles
         * @memberOf YapFilesView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderYapFiles.bind(this)
            );
        }

    }, BaseView.prototype)

});
