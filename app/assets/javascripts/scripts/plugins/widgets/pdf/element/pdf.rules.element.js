/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePdfRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Pdf Rules Element
     * @param view
     * @param opts
     * @returns {PdfRulesElement}
     * @constructor
     * @class PdfRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PdfRulesElement = function PdfRulesElement(view, opts) {

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

    return PdfRulesElement.extend('PdfRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});