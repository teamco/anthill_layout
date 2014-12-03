/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTwitrPixRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define TwitrPix Rules Element
     * @param view
     * @param opts
     * @returns {TwitrPixRulesElement}
     * @constructor
     * @class TwitrPixRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TwitrPixRulesElement = function TwitrPixRulesElement(view, opts) {

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

    return TwitrPixRulesElement.extend('TwitrPixRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
