/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineAnimatronRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Animatron Rules Element
   * @param view
   * @param opts
   * @returns {AnimatronRulesElement}
   * @constructor
   * @class AnimatronRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var AnimatronRulesElement = function AnimatronRulesElement(view, opts) {

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

  return AnimatronRulesElement.extend(
      'AnimatronRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
