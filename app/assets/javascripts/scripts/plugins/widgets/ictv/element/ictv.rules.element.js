/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineIctvRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Ictv Rules Element
     * @param view
     * @param opts
     * @returns {IctvRulesElement}
     * @constructor
     * @class IctvRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var IctvRulesElement = function IctvRulesElement(view, opts) {

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

    return IctvRulesElement.extend('IctvRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
