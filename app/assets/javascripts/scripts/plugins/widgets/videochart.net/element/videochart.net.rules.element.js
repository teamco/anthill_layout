/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineVideochartNetRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define VideochartNet Rules Element
   * @param view
   * @param opts
   * @returns {VideochartNetRulesElement}
   * @constructor
   * @class VideochartNetRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var VideochartNetRulesElement = function VideochartNetRulesElement(view,
      opts) {

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

  return VideochartNetRulesElement.extend(
      'VideochartNetRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
