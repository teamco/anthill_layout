/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFlipPdfRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define FlipPdf Rules Element
     * @param view
     * @param opts
     * @returns {FlipPdfRulesElement}
     * @constructor
     * @class FlipPdfRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var FlipPdfRulesElement = function FlipPdfRulesElement(view, opts) {

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

    return FlipPdfRulesElement.extend('FlipPdfRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
