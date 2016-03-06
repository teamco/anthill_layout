/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePastebinRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Pastebin Rules Element
     * @param view
     * @param opts
     * @returns {PastebinRulesElement}
     * @constructor
     * @class PastebinRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PastebinRulesElement = function PastebinRulesElement(view, opts) {

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

    return PastebinRulesElement.extend('PastebinRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
