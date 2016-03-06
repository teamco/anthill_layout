/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePicasaRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Picasa Rules Element
     * @param view
     * @param opts
     * @returns {PicasaRulesElement}
     * @constructor
     * @class PicasaRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PicasaRulesElement = function PicasaRulesElement(view, opts) {

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

    return PicasaRulesElement.extend('PicasaRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
