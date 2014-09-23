/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePetPassportElement(BaseElement) {

    /**
     * Define PetPassport Element
     * @param view
     * @param opts
     * @returns {PetPassportElement}
     * @constructor
     * @class PetPassportElement
     * @extends BaseElement
     */
    var PetPassportElement = function PetPassportElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pet.passport', {
            resource: '/widgets'
        });

        return this;
    };

    return PetPassportElement.extend('PetPassportElement', {

        /**
         * Render Embedded content
         * @member PetPassportElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            var $mainContainer = [
                '<div id="mainContainer"><label class="petname">Spike</label>',
                '<div class="passportContainer"><ul class="passportRows"></ul></div>',
                '<div class="passportFooter"><div class="editModeMenu">Edit Details</div></div>',
                '</div>'
            ].join('');

            $element.view.controller.clearParentThumbnail();
            $element.$.append($mainContainer);

            require([
                'plugins/widgets/pet.passport/mvc/pet.passport.behavior'
            ], function showPetPassport(PetPassportBehavior) {
                var showPetPassport = new PetPassportBehavior();
            });


        }

    }, BaseElement.prototype);

});