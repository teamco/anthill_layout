/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePreziRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Prezi Rules Element
     * @param view
     * @param opts
     * @returns {PreziRulesElement}
     * @constructor
     * @class PreziRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PreziRulesElement = function PreziRulesElement(view, opts) {

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

    return PreziRulesElement.extend('PreziRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
