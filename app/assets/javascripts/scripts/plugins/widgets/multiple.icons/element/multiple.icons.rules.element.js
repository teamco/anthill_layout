/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineMultipleIconsRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define MultipleIcons Rules Element
     * @param view
     * @param opts
     * @returns {MultipleIconsRulesElement}
     * @constructor
     * @class MultipleIconsRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var MultipleIconsRulesElement = function MultipleIconsRulesElement(view, opts) {

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

    return MultipleIconsRulesElement.extend('MultipleIconsRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});