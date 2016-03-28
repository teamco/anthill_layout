/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineVideoPayNetRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define VideoPayNet Rules Element
     * @param view
     * @param opts
     * @returns {VideoPayNetRulesElement}
     * @constructor
     * @class VideoPayNetRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var VideoPayNetRulesElement = function VideoPayNetRulesElement(view, opts) {

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

    return VideoPayNetRulesElement.extend('VideoPayNetRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
