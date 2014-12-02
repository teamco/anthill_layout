/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTinyPicRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define TinyPic Rules Element
     * @param view
     * @param opts
     * @returns {TinyPicRulesElement}
     * @constructor
     * @class TinyPicRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TinyPicRulesElement = function TinyPicRulesElement(view, opts) {

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

    return TinyPicRulesElement.extend('TinyPicRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
