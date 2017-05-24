/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineTinymceRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Tinymce Rules Element
   * @param view
   * @param opts
   * @returns {TinymceRulesElement}
   * @constructor
   * @class TinymceRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TinymceRulesElement = function TinymceRulesElement(view, opts) {

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

  return TinymceRulesElement.extend(
      'TinymceRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
