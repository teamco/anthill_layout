/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineImageRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Image Rules Element
     * @param view
     * @param opts
     * @returns {ImageRulesElement}
     * @constructor
     * @class ImageRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ImageRulesElement = function ImageRulesElement(view, opts) {

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

    return ImageRulesElement.extend('ImageRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});