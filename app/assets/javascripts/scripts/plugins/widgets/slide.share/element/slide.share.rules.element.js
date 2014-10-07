/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineSlideShareRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define SlideShare Rules Element
     * @param view
     * @param opts
     * @returns {SlideShareRulesElement}
     * @constructor
     * @class SlideShareRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var SlideShareRulesElement = function SlideShareRulesElement(view, opts) {

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

    return SlideShareRulesElement.extend('SlideShareRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
