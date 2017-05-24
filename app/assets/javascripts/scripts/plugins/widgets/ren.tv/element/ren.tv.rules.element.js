/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineRenTvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define RenTv Rules Element
   * @param view
   * @param opts
   * @returns {RenTvRulesElement}
   * @constructor
   * @class RenTvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var RenTvRulesElement = function RenTvRulesElement(view, opts) {

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

  return RenTvRulesElement.extend(
      'RenTvRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
