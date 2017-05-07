/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineTourTvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define TourTv Rules Element
   * @param view
   * @param opts
   * @returns {TourTvRulesElement}
   * @constructor
   * @class TourTvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TourTvRulesElement = function TourTvRulesElement(view, opts) {

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

  return TourTvRulesElement.extend('TourTvRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
