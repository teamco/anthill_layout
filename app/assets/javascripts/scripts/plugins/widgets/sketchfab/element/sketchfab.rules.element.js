/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineSketchfabRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Sketchfab Rules Element
   * @param view
   * @param opts
   * @returns {SketchfabRulesElement}
   * @constructor
   * @class SketchfabRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SketchfabRulesElement = function SketchfabRulesElement(view, opts) {

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

  return SketchfabRulesElement.extend(
      'SketchfabRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
