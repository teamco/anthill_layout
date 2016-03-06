/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePinterestRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Pinterest Rules Element
     * @param view
     * @param opts
     * @returns {PinterestRulesElement}
     * @constructor
     * @class PinterestRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PinterestRulesElement = function PinterestRulesElement(view, opts) {

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

    return PinterestRulesElement.extend('PinterestRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
