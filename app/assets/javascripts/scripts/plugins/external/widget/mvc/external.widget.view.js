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
    'element/footer.element'
], function defineExternalWidgetView(BaseView, Header, Footer) {

    /**
     * Define view
     * @class ExternalWidgetView
     * @extends BaseView
     * @constructor
     */
    var ExternalWidgetView = function ExternalWidgetView() {
    };

    return ExternalWidgetView.extend('ExternalWidgetView', {

        /**
         * Render external element
         * @memberOf ExternalWidgetView
         */
        renderExternalWidget: function renderExternalWidget() {

            this.header(Header, this.get$container());

            require(
                [this.scope.externalResource + 'element/external.widget.element.js'],
                function _loadElement(ExternalWidgetElement) {

                    /**
                     * Define $image
                     * @type {ExternalWidgetElement}
                     */
                    this.elements.$externalwidget = new ExternalWidgetElement(this, {
                        $container: this.get$container().$,
                        id: this.createUUID()
                    });

                    this.footer(Footer, this.get$container());

                    this.scope.observer.publish(
                        this.scope.eventmanager.eventList.analyzeEmbeddedContent
                    );

                }.bind(this)
            );
        },

        /**
         * Render Prefs
         * @memberOf ExternalWidgetView
         * @returns {ExternalWidgetPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            if (this.elements.$preferences) {
                return this.get$preferences();
            }

            require(
                [this.scope.externalResource + 'element/external.widget.preferences.element.js'],
                function _loadElement(ExternalWidgetPreferencesElement) {

                    /**
                     * Define ExternalWidget Preferences Element
                     * @type {ExternalWidgetPreferencesElement}
                     */
                    this.elements.$preferences = new ExternalWidgetPreferencesElement(this, {
                        data: this.controller.getPreferences()
                    });

                }.bind(this)
            );
        },

        /**
         * Render Rules
         * @memberOf ExternalWidgetView
         * @param widgetRules
         * @param contentRules
         * @returns {ExternalWidgetRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            if (this.elements.$rules) {
                return this.get$rules();
            }

            require(
                [this.scope.externalResource + 'element/external.widget.rules.element.js'],
                function _loadElement(ExternalWidgetRulesElement) {

                    /**
                     * Define ExternalWidget Rules Element
                     * @type {ExternalWidgetRulesElement}
                     */
                    this.elements.$rules = new ExternalWidgetRulesElement(this, {
                        data: this.controller.getRules(),
                        rules: {
                            widget: widgetRules,
                            content: contentRules
                        }
                    });

                }.bind(this)
            );
        },

        /**
         * Render image
         * @memberOf ExternalWidgetView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderExternalWidget.bind(this)
            );
        }

    }, BaseView.prototype)
});