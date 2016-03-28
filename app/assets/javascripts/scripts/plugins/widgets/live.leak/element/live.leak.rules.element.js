/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineLiveLeakRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define LiveLeak Rules Element
     * @param view
     * @param opts
     * @returns {LiveLeakRulesElement}
     * @constructor
     * @class LiveLeakRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var LiveLeakRulesElement = function LiveLeakRulesElement(view, opts) {

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

    return LiveLeakRulesElement.extend('LiveLeakRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
