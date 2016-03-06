/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineIsnareRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Isnare Rules Element
     * @param view
     * @param opts
     * @returns {IsnareRulesElement}
     * @constructor
     * @class IsnareRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var IsnareRulesElement = function IsnareRulesElement(view, opts) {

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

    return IsnareRulesElement.extend('IsnareRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
