/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineXkcdRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Xkcd Rules Element
     * @param view
     * @param opts
     * @returns {XkcdRulesElement}
     * @constructor
     * @class XkcdRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var XkcdRulesElement = function XkcdRulesElement(view, opts) {

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

    return XkcdRulesElement.extend('XkcdRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
