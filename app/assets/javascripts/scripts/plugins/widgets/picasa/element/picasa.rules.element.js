/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePicasaRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Picasa Rules Element
     * @param view
     * @param opts
     * @returns {PicasaRulesElement}
     * @constructor
     * @class PicasaRulesElement
     * @extends PluginElement
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

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
