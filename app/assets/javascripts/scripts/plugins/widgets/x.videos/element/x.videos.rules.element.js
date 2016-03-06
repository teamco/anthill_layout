/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineXVideosRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define XVideos Rules Element
     * @param view
     * @param opts
     * @returns {XVideosRulesElement}
     * @constructor
     * @class XVideosRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var XVideosRulesElement = function XVideosRulesElement(view, opts) {

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

    return XVideosRulesElement.extend('XVideosRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
