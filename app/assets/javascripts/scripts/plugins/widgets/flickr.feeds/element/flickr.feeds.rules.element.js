/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineFlickrFeedsRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define FlickrFeeds Rules Element
     * @param view
     * @param opts
     * @returns {FlickrFeedsRulesElement}
     * @constructor
     * @class FlickrFeedsRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var FlickrFeedsRulesElement = function FlickrFeedsRulesElement(view, opts) {

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

    return FlickrFeedsRulesElement.extend('FlickrFeedsRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
