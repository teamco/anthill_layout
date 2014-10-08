/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFlickrRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Flickr Rules Element
     * @param view
     * @param opts
     * @returns {FlickrRulesElement}
     * @constructor
     * @class FlickrRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var FlickrRulesElement = function FlickrRulesElement(view, opts) {

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

    return FlickrRulesElement.extend('FlickrRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
