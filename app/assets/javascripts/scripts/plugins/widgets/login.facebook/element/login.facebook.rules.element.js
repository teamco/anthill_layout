/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineLoginFacebookRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define LoginFacebook Rules Element
     * @param view
     * @param opts
     * @returns {LoginFacebookRulesElement}
     * @constructor
     * @class LoginFacebookRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var LoginFacebookRulesElement = function LoginFacebookRulesElement(view, opts) {

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

    return LoginFacebookRulesElement.extend('LoginFacebookRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});