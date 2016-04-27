/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineVerseRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Verse Rules Element
     * @param view
     * @param opts
     * @returns {VerseRulesElement}
     * @constructor
     * @class VerseRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var VerseRulesElement = function VerseRulesElement(view, opts) {

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

    return VerseRulesElement.extend(
        'VerseRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
