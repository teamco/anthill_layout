/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineJsFiddleRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define JsFiddle Rules Element
     * @param view
     * @param opts
     * @returns {JsFiddleRulesElement}
     * @constructor
     * @class JsFiddleRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var JsFiddleRulesElement = function JsFiddleRulesElement(view, opts) {

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

    return JsFiddleRulesElement.extend('JsFiddleRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
