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
    'plugins/widgets/pet.radar/element/pet.radar.element',
    'plugins/widgets/pet.radar/element/pet.radar.preferences.element',
    'plugins/widgets/pet.radar/element/pet.radar.rules.element'
], function definePetRadarView(BaseView, Header, Footer, PetRadarElement, PetRadarPreferencesElement, PetRadarRulesElement) {

    /**
     * Define view
     * @class PetRadarView
     * @extends BaseView
     * @constructor
     */
    var PetRadarView = function PetRadarView() {
    };

    return PetRadarView.extend('PetRadarView', {

        /**
         * Render pet.radar element
         * @memberOf PetRadarView
         */
        renderPetRadar: function renderPetRadar() {

            this.header(Header, this.get$container());

            /**
             * Define $pet.radar
             * @type {PetRadarElement}
             */
            this.elements.$petradar = new PetRadarElement(this, {
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
         * @memberOf PetRadarView
         * @returns {PetRadarPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PetRadar Preferences Element
             * @type {PetRadarPreferencesElement}
             */
            this.elements.$preferences = new PetRadarPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf PetRadarView
         * @param widgetRules
         * @param contentRules
         * @returns {PetRadarRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define PetRadar Rules Element
             * @type {PetRadarRulesElement}
             */
            this.elements.$rules = new PetRadarRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render pet.radar
         * @memberOf PetRadarView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPetRadar.bind(this)
            );
        }

    }, BaseView.prototype)

});