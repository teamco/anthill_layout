/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTwitsRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Twits Rules Element
     * @param view
     * @param opts
     * @returns {TwitsRulesElement}
     * @constructor
     * @class TwitsRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TwitsRulesElement = function TwitsRulesElement(view, opts) {

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

    return TwitsRulesElement.extend('TwitsRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});