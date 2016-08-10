/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineEbaumsWorldRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define EbaumsWorld Rules Element
     * @param view
     * @param opts
     * @returns {EbaumsWorldRulesElement}
     * @constructor
     * @class EbaumsWorldRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var EbaumsWorldRulesElement = function EbaumsWorldRulesElement(view, opts) {

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

    return EbaumsWorldRulesElement.extend(
        'EbaumsWorldRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
