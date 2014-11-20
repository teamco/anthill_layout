/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineQrCodeRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define QrCode Rules Element
     * @param view
     * @param opts
     * @returns {QrCodeRulesElement}
     * @constructor
     * @class QrCodeRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var QrCodeRulesElement = function QrCodeRulesElement(view, opts) {

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

    return QrCodeRulesElement.extend('QrCodeRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
