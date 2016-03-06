/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineHeaderRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Header Rules Element
     * @param view
     * @param opts
     * @returns {HeaderRulesElement}
     * @constructor
     * @class HeaderRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var HeaderRulesElement = function HeaderRulesElement(view, opts) {

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

    return HeaderRulesElement.extend('HeaderRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});