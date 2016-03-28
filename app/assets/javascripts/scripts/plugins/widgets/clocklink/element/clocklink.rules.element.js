/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineClocklinkRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Clocklink Rules Element
     * @param view
     * @param opts
     * @returns {ClocklinkRulesElement}
     * @constructor
     * @class ClocklinkRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var ClocklinkRulesElement = function ClocklinkRulesElement(view, opts) {

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

    return ClocklinkRulesElement.extend('ClocklinkRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
