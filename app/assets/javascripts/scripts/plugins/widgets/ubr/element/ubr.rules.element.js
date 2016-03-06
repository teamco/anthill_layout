/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineUbrRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Ubr Rules Element
     * @param view
     * @param opts
     * @returns {UbrRulesElement}
     * @constructor
     * @class UbrRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var UbrRulesElement = function UbrRulesElement(view, opts) {

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

    return UbrRulesElement.extend('UbrRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
