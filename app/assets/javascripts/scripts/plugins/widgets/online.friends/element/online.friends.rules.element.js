/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineOnlineFriendsRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define OnlineFriends Rules Element
     * @param view
     * @param opts
     * @returns {OnlineFriendsRulesElement}
     * @constructor
     * @class OnlineFriendsRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var OnlineFriendsRulesElement = function OnlineFriendsRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
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

    return OnlineFriendsRulesElement.extend('OnlineFriendsRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});