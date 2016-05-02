/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineSkypeRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Skype Rules Element
     * @param view
     * @param opts
     * @returns {SkypeRulesElement}
     * @constructor
     * @class SkypeRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var SkypeRulesElement = function SkypeRulesElement(view, opts) {

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

    return SkypeRulesElement.extend(
        'SkypeRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
