/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineElevenChannelUaRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define ElevenChannelUa Rules Element
     * @param view
     * @param opts
     * @returns {ElevenChannelUaRulesElement}
     * @constructor
     * @class ElevenChannelUaRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ElevenChannelUaRulesElement = function ElevenChannelUaRulesElement(view, opts) {

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

    return ElevenChannelUaRulesElement.extend('ElevenChannelUaRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
