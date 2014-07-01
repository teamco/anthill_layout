/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePassportElement(BaseElement) {

    /**
     * Define Passport Element
     * @param view
     * @param opts
     * @returns {PassportElement}
     * @constructor
     * @class PassportElement
     * @extends BaseElement
     */
    var PassportElement = function PassportElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('passport', {resource: '/widgets'});

        return this;
    };

    return PassportElement.extend('PassportElement', {

        /**
         * Render Embedded content
         * @member PassportElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
//            
//             require([
//                'plugins/widgets/passport/mvc/passport.behavior'
//            ], function showPassport() {
                 var $mainContainer = ['<div id="mainContainer"><label class="petname">Spike</label>',
                                  '<div class="passportContainer"><ul class="passportRows"></ul></div>',
                                  '<div class="passportFooter"><div class="editModeMenu">Edit Fields</div></div>',
                                  '</div>'].join('');
            
            $element.view.controller.clearParentThumbnail();
            $element.$.append($mainContainer);
            
                        
             require([
                'plugins/widgets/passport/mvc/passport.behavior'
            ], function showPassport(PassportBehavior) {
                var showPassport = new PassportBehavior();
            });
            
           
        }

    }, BaseElement.prototype);

});