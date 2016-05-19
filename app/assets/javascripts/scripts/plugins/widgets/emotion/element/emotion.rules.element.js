/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineEmotionRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Emotion Rules Element
     * @param view
     * @param opts
     * @returns {EmotionRulesElement}
     * @constructor
     * @class EmotionRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var EmotionRulesElement = function EmotionRulesElement(view, opts) {

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

    return EmotionRulesElement.extend(
        'EmotionRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
