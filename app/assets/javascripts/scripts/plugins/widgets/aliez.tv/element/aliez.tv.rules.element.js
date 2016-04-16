/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineAliezTvRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define AliezTv Rules Element
     * @param view
     * @param opts
     * @returns {AliezTvRulesElement}
     * @constructor
     * @class AliezTvRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var AliezTvRulesElement = function AliezTvRulesElement(view, opts) {

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

    return AliezTvRulesElement.extend(
        'AliezTvRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
