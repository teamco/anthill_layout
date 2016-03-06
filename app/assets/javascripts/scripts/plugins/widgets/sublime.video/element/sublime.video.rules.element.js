/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineSublimeVideoRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define SublimeVideo Rules Element
     * @param view
     * @param opts
     * @returns {SublimeVideoRulesElement}
     * @constructor
     * @class SublimeVideoRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var SublimeVideoRulesElement = function SublimeVideoRulesElement(view, opts) {

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

    return SublimeVideoRulesElement.extend('SublimeVideoRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
