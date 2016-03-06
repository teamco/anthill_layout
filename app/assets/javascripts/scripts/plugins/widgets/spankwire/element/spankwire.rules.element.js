/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineSpankwireRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Spankwire Rules Element
     * @param view
     * @param opts
     * @returns {SpankwireRulesElement}
     * @constructor
     * @class SpankwireRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var SpankwireRulesElement = function SpankwireRulesElement(view, opts) {

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

    return SpankwireRulesElement.extend('SpankwireRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
