/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineIceFloeRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define IceFloe Rules Element
     * @param view
     * @param opts
     * @returns {IceFloeRulesElement}
     * @constructor
     * @class IceFloeRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var IceFloeRulesElement = function IceFloeRulesElement(view, opts) {

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

    return IceFloeRulesElement.extend('IceFloeRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});