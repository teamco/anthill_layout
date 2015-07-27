/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineExternalRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define External Rules Element
     * @param view
     * @param opts
     * @returns {ExternalRulesElement}
     * @constructor
     * @class ExternalRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ExternalRulesElement = function ExternalRulesElement(view, opts) {

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

    return ExternalRulesElement.extend('ExternalRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});