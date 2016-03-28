/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineTwitsRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Twits Rules Element
     * @param view
     * @param opts
     * @returns {TwitsRulesElement}
     * @constructor
     * @class TwitsRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var TwitsRulesElement = function TwitsRulesElement(view, opts) {

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

    return TwitsRulesElement.extend('TwitsRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});