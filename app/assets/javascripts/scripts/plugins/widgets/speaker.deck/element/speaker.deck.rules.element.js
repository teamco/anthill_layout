/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineSpeakerDeckRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define SpeakerDeck Rules Element
   * @param view
   * @param opts
   * @returns {SpeakerDeckRulesElement}
   * @constructor
   * @class SpeakerDeckRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SpeakerDeckRulesElement = function SpeakerDeckRulesElement(view, opts) {

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

  return SpeakerDeckRulesElement.extend(
      'SpeakerDeckRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
