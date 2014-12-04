/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTviRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Tvi Rules Element
     * @param view
     * @param opts
     * @returns {TviRulesElement}
     * @constructor
     * @class TviRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TviRulesElement = function TviRulesElement(view, opts) {

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

    return TviRulesElement.extend('TviRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
