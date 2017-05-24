/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineAccuweatherVideosRulesElement(PluginElement,
    BaseWidgetRules) {

  /**
   * Define AccuweatherVideos Rules Element
   * @param view
   * @param opts
   * @returns {AccuweatherVideosRulesElement}
   * @constructor
   * @class AccuweatherVideosRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var AccuweatherVideosRulesElement = function AccuweatherVideosRulesElement(view,
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

  return AccuweatherVideosRulesElement.extend(
      'AccuweatherVideosRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
