/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePremiereTvRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define PremiereTv Rules Element
     * @param view
     * @param opts
     * @returns {PremiereTvRulesElement}
     * @constructor
     * @class PremiereTvRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PremiereTvRulesElement = function PremiereTvRulesElement(view, opts) {

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

    return PremiereTvRulesElement.extend('PremiereTvRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
