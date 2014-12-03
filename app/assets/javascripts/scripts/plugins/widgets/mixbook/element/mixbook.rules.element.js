/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineMixbookRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Mixbook Rules Element
     * @param view
     * @param opts
     * @returns {MixbookRulesElement}
     * @constructor
     * @class MixbookRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var MixbookRulesElement = function MixbookRulesElement(view, opts) {

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

    return MixbookRulesElement.extend('MixbookRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
