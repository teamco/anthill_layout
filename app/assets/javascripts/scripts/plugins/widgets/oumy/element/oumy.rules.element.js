/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineOumyRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Oumy Rules Element
     * @param view
     * @param opts
     * @returns {OumyRulesElement}
     * @constructor
     * @class OumyRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var OumyRulesElement = function OumyRulesElement(view, opts) {

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

    return OumyRulesElement.extend(
        'OumyRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
