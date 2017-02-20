/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineLoginGoogleRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define LoginGoogle Rules Element
   * @param view
   * @param opts
   * @returns {LoginGoogleRulesElement}
   * @constructor
   * @class LoginGoogleRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var LoginGoogleRulesElement = function LoginGoogleRulesElement(view, opts) {

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

  return LoginGoogleRulesElement.extend('LoginGoogleRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});