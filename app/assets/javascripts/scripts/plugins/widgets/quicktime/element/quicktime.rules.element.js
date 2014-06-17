/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineQuicktimeRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Quicktime Rules Element
     * @param view
     * @param opts
     * @returns {QuicktimeRulesElement}
     * @constructor
     * @class QuicktimeRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var QuicktimeRulesElement = function QuicktimeRulesElement(view, opts) {

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

    return QuicktimeRulesElement.extend('QuicktimeRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});