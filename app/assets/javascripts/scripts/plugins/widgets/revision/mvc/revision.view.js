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
    'plugins/widgets/revision/element/revision.element',
    'plugins/widgets/revision/element/revision.preferences.element',
    'plugins/widgets/revision/element/revision.rules.element'
], function defineRevisionView(BaseView, Header, Footer, RevisionElement, RevisionPreferencesElement, RevisionRulesElement) {

    /**
     * Define view
     * @class RevisionView
     * @extends BaseView
     * @constructor
     */
    var RevisionView = function RevisionView() {
    };

    return RevisionView.extend('RevisionView', {

        /**
         * Render revision element
         * @memberOf RevisionView
         */
        renderRevision: function renderRevision() {

            this.header(Header, this.get$container());

            /**
             * Define $revision
             * @type {RevisionElement}
             */
            this.elements.$revision = new RevisionElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf RevisionView
         * @returns {RevisionPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Revision Preferences Element
             * @type {RevisionPreferencesElement}
             */
            this.elements.$preferences = new RevisionPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf RevisionView
         * @param widgetRules
         * @param contentRules
         * @returns {RevisionRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Revision Rules Element
             * @type {RevisionRulesElement}
             */
            this.elements.$rules = new RevisionRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render revision
         * @memberOf RevisionView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderRevision.bind(this)
            );
        }

    }, BaseView.prototype)

});
