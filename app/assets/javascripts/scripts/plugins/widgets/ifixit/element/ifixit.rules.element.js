/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineIfixitRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Ifixit Rules Element
     * @param view
     * @param opts
     * @returns {IfixitRulesElement}
     * @constructor
     * @class IfixitRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var IfixitRulesElement = function IfixitRulesElement(view, opts) {

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

    return IfixitRulesElement.extend(
        'IfixitRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
