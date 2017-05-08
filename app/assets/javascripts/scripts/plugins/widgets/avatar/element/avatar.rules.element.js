/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineAvatarRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Avatar Rules Element
   * @param view
   * @param opts
   * @returns {AvatarRulesElement}
   * @constructor
   * @class AvatarRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var AvatarRulesElement = function AvatarRulesElement(view, opts) {

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

  return AvatarRulesElement.extend('AvatarRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});