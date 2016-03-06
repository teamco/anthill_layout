/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFotoKritikRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define FotoKritik Rules Element
     * @param view
     * @param opts
     * @returns {FotoKritikRulesElement}
     * @constructor
     * @class FotoKritikRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var FotoKritikRulesElement = function FotoKritikRulesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
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

    return FotoKritikRulesElement.extend('FotoKritikRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
