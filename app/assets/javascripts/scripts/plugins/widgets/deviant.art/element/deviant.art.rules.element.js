/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineDeviantArtRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define DeviantArt Rules Element
     * @param view
     * @param opts
     * @returns {DeviantArtRulesElement}
     * @constructor
     * @class DeviantArtRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var DeviantArtRulesElement = function DeviantArtRulesElement(view, opts) {

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

    return DeviantArtRulesElement.extend('DeviantArtRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
