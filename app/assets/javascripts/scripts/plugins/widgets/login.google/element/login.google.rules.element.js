/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineLoginGoogleRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define LoginGoogle Rules Element
     * @param view
     * @param opts
     * @returns {LoginGoogleRulesElement}
     * @constructor
     * @class LoginGoogleRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var LoginGoogleRulesElement = function LoginGoogleRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
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

    return LoginGoogleRulesElement.extend('LoginGoogleRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});