/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePornhubRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Pornhub Rules Element
     * @param view
     * @param opts
     * @returns {PornhubRulesElement}
     * @constructor
     * @class PornhubRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PornhubRulesElement = function PornhubRulesElement(view, opts) {

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

    return PornhubRulesElement.extend('PornhubRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
