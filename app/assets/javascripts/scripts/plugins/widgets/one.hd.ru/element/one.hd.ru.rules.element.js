/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineOneHdRuRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define OneHdRu Rules Element
     * @param view
     * @param opts
     * @returns {OneHdRuRulesElement}
     * @constructor
     * @class OneHdRuRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var OneHdRuRulesElement = function OneHdRuRulesElement(view, opts) {

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

    return OneHdRuRulesElement.extend('OneHdRuRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
