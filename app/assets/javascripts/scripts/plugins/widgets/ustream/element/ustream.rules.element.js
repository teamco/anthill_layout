/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineUstreamRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Ustream Rules Element
     * @param view
     * @param opts
     * @returns {UstreamRulesElement}
     * @constructor
     * @class UstreamRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var UstreamRulesElement = function UstreamRulesElement(view, opts) {

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

    return UstreamRulesElement.extend('UstreamRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
