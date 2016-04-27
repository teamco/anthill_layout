/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineSapoVideosRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define SapoVideos Rules Element
     * @param view
     * @param opts
     * @returns {SapoVideosRulesElement}
     * @constructor
     * @class SapoVideosRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var SapoVideosRulesElement = function SapoVideosRulesElement(view, opts) {

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

    return SapoVideosRulesElement.extend(
        'SapoVideosRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
