/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineKremRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Krem Rules Element
     * @param view
     * @param opts
     * @returns {KremRulesElement}
     * @constructor
     * @class KremRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var KremRulesElement = function KremRulesElement(view, opts) {

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

    return KremRulesElement.extend('KremRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
