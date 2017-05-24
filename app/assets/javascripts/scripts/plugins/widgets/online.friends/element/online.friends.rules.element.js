/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineOnlineFriendsRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define OnlineFriends Rules Element
   * @param view
   * @param opts
   * @returns {OnlineFriendsRulesElement}
   * @constructor
   * @class OnlineFriendsRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var OnlineFriendsRulesElement = function OnlineFriendsRulesElement(view,
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

  return OnlineFriendsRulesElement.extend('OnlineFriendsRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});