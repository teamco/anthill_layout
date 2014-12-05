/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFreshTvRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define FreshTv Rules Element
     * @param view
     * @param opts
     * @returns {FreshTvRulesElement}
     * @constructor
     * @class FreshTvRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var FreshTvRulesElement = function FreshTvRulesElement(view, opts) {

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

    return FreshTvRulesElement.extend('FreshTvRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
