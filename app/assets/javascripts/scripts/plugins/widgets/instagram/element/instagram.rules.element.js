/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineInstagramRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Instagram Rules Element
     * @param view
     * @param opts
     * @returns {InstagramRulesElement}
     * @constructor
     * @class InstagramRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var InstagramRulesElement = function InstagramRulesElement(view, opts) {

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

    return InstagramRulesElement.extend('InstagramRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
