/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineOrphusRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Orphus Rules Element
     * @param view
     * @param opts
     * @returns {OrphusRulesElement}
     * @constructor
     * @class OrphusRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var OrphusRulesElement = function OrphusRulesElement(view, opts) {

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

    return OrphusRulesElement.extend(
        'OrphusRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
