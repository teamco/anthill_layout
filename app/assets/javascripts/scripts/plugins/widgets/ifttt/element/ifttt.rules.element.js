/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineIftttRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Ifttt Rules Element
     * @param view
     * @param opts
     * @returns {IftttRulesElement}
     * @constructor
     * @class IftttRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var IftttRulesElement = function IftttRulesElement(view, opts) {

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

    return IftttRulesElement.extend(
        'IftttRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
