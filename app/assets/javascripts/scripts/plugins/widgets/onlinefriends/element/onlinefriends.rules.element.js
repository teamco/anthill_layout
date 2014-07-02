/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineOnlinefriendsRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Onlinefriends Rules Element
     * @param view
     * @param opts
     * @returns {OnlinefriendsRulesElement}
     * @constructor
     * @class OnlinefriendsRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var OnlinefriendsRulesElement = function OnlinefriendsRulesElement(view, opts) {

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

    return OnlinefriendsRulesElement.extend('OnlinefriendsRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});