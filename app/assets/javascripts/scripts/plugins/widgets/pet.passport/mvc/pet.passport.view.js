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
    'plugins/widgets/pet.passport/element/pet.passport.element',
    'plugins/widgets/pet.passport/element/pet.passport.preferences.element',
    'plugins/widgets/pet.passport/element/pet.passport.rules.element'
], function definePetPassportView(BaseView, Header, Footer, PetPassportElement, PetPassportPreferencesElement, PetPassportRulesElement) {

    /**
     * Define view
     * @class PetPassportView
     * @extends BaseView
     * @constructor
     */
    var PetPassportView = function PetPassportView() {
    };

    return PetPassportView.extend('PetPassportView', {

        /**
         * Render pet.passport element
         * @memberOf PetPassportView
         */
        renderPetPassport: function renderPetPassport() {

            this.header(Header, this.get$container());

            /**
             * Define $pet.passport
             * @type {PetPassportElement}
             */
            this.elements.$petpassport = new PetPassportElement(this, {
                $container: this.get$container().$,
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PetPassportView
         * @returns {PetPassportPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PetPassport Preferences Element
             * @type {PetPassportPreferencesElement}
             */
            this.elements.$preferences = new PetPassportPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf PetPassportView
         * @param widgetRules
         * @param contentRules
         * @returns {PetPassportRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define PetPassport Rules Element
             * @type {PetPassportRulesElement}
             */
            this.elements.$rules = new PetPassportRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render pet.passport
         * @memberOf PetPassportView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPetPassport.bind(this)
            );
        }

    }, BaseView.prototype)

});