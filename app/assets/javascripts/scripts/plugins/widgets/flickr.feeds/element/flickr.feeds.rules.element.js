/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFlickrFeedsRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define FlickrFeeds Rules Element
     * @param view
     * @param opts
     * @returns {FlickrFeedsRulesElement}
     * @constructor
     * @class FlickrFeedsRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var FlickrFeedsRulesElement = function FlickrFeedsRulesElement(view, opts) {

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

    return FlickrFeedsRulesElement.extend('FlickrFeedsRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
