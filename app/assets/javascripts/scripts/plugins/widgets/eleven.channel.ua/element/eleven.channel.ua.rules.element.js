/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineElevenChannelUaRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define ElevenChannelUa Rules Element
     * @param view
     * @param opts
     * @returns {ElevenChannelUaRulesElement}
     * @constructor
     * @class ElevenChannelUaRulesElement
     * @extends PluginElement
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

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
