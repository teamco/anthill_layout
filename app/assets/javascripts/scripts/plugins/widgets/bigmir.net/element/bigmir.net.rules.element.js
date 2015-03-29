/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineBigmirNetRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define BigmirNet Rules Element
     * @param view
     * @param opts
     * @returns {BigmirNetRulesElement}
     * @constructor
     * @class BigmirNetRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var BigmirNetRulesElement = function BigmirNetRulesElement(view, opts) {

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

    return BigmirNetRulesElement.extend('BigmirNetRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});