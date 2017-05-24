/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineEdocrRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Edocr Rules Element
   * @param view
   * @param opts
   * @returns {EdocrRulesElement}
   * @constructor
   * @class EdocrRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var EdocrRulesElement = function EdocrRulesElement(view, opts) {

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

  return EdocrRulesElement.extend(
      'EdocrRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
