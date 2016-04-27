/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineVideopressRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Videopress Rules Element
     * @param view
     * @param opts
     * @returns {VideopressRulesElement}
     * @constructor
     * @class VideopressRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var VideopressRulesElement = function VideopressRulesElement(view, opts) {

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

    return VideopressRulesElement.extend(
        'VideopressRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
