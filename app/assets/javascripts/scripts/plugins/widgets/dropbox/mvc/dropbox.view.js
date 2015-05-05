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
    'plugins/widgets/dropbox/element/dropbox.element',
    'plugins/widgets/dropbox/element/dropbox.preferences.element',
    'plugins/widgets/dropbox/element/dropbox.rules.element'
], function defineDropboxView(BaseView, Header, Footer, DropboxElement, DropboxPreferencesElement, DropboxRulesElement) {

    /**
     * Define view
     * @class DropboxView
     * @extends BaseView
     * @constructor
     */
    var DropboxView = function DropboxView() {
    };

    return DropboxView.extend('DropboxView', {

        /**
         * Render youtube element
         * @memberOf DropboxView
         */
        renderDropbox: function renderDropbox() {

            this.header(Header, this.elements.$container);

            /**
             * Define $youtube
             * @type {DropboxElement}
             */
            this.elements.$dropbox = new DropboxElement(this, {
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
         * @memberOf DropboxView
         * @returns {DropboxPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Dropbox Preferences Element
             * @type {DropboxPreferencesElement}
             */
            this.elements.$preferences = new DropboxPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf DropboxView
         * @param widgetRules
         * @param contentRules
         * @returns {DropboxRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Dropbox Rules Element
             * @type {DropboxRulesElement}
             */
            this.elements.$rules = new DropboxRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render youtube
         * @memberOf DropboxView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderDropbox.bind(this)
            );
        }

    }, BaseView.prototype)

});