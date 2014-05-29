/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/rules/widget.base.rules'
], function definePageTabsRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define PageTabs Rules Element
     * @param view
     * @param opts
     * @returns {PageTabsRulesElement}
     * @constructor
     * @class PageTabsRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PageTabsRulesElement = function PageTabsRulesElement(view, opts) {

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

    return PageTabsRulesElement.extend('PageTabsRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});