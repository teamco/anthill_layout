/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/rules/widget.base.rules'
], function defineRssRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Rss Rules Element
     * @param view
     * @param opts
     * @returns {RssRulesElement}
     * @constructor
     * @class RssRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var RssRulesElement = function RssRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
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

    return RssRulesElement.extend('RssRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});