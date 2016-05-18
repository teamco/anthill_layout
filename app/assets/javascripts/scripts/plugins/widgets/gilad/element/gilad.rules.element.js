/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineGiladRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Gilad Rules Element
     * @param view
     * @param opts
     * @returns {GiladRulesElement}
     * @constructor
     * @class GiladRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var GiladRulesElement = function GiladRulesElement(view, opts) {

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

    return GiladRulesElement.extend(
        'GiladRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
