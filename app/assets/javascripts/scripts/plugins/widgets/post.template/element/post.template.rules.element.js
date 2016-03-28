/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePostTemplateRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define PostTemplate Rules Element
     * @param view
     * @param opts
     * @returns {PostTemplateRulesElement}
     * @constructor
     * @class PostTemplateRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PostTemplateRulesElement = function PostTemplateRulesElement(view, opts) {

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

    return PostTemplateRulesElement.extend('PostTemplateRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});