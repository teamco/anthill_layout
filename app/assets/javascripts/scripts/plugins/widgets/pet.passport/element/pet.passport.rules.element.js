/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePetPassportRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define PetPassport Rules Element
     * @param view
     * @param opts
     * @returns {PetPassportRulesElement}
     * @constructor
     * @class PetPassportRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PetPassportRulesElement = function PetPassportRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBaseRulesData(
            opts.data,
            opts.rules.widget,
            opts.rules.content
        );

        return this;
    };

    return PetPassportRulesElement.extend('PetPassportRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});