/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineLoginRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Login Rules Element
     * @param view
     * @param opts
     * @returns {LoginRulesElement}
     * @constructor
     * @class LoginRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var LoginRulesElement = function LoginRulesElement(view, opts) {

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

    return LoginRulesElement.extend('LoginRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});