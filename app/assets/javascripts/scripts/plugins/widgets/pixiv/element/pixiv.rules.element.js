/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePixivRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Pixiv Rules Element
     * @param view
     * @param opts
     * @returns {PixivRulesElement}
     * @constructor
     * @class PixivRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PixivRulesElement = function PixivRulesElement(view, opts) {

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

    return PixivRulesElement.extend('PixivRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
