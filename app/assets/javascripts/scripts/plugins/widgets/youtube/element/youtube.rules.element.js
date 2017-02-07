/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineYoutubeRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Youtube Rules Element
   * @param view
   * @param opts
   * @returns {YoutubeRulesElement}
   * @constructor
   * @class YoutubeRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var YoutubeRulesElement = function YoutubeRulesElement(view, opts) {

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

  return YoutubeRulesElement.extend('YoutubeRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});