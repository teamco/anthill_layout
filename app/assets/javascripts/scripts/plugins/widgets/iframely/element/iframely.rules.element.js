/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineIframelyRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Iframely Rules Element
     * @param view
     * @param opts
     * @returns {IframelyRulesElement}
     * @constructor
     * @class IframelyRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var IframelyRulesElement = function IframelyRulesElement(view, opts) {

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

    return IframelyRulesElement.extend(
        'IframelyRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
