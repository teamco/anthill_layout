/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePdfRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Pdf Rules Element
     * @param view
     * @param opts
     * @returns {PdfRulesElement}
     * @constructor
     * @class PdfRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PdfRulesElement = function PdfRulesElement(view, opts) {

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

    return PdfRulesElement.extend('PdfRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});