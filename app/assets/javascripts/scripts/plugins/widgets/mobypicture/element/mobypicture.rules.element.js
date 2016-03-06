/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineMobypictureRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Mobypicture Rules Element
     * @param view
     * @param opts
     * @returns {MobypictureRulesElement}
     * @constructor
     * @class MobypictureRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var MobypictureRulesElement = function MobypictureRulesElement(view, opts) {

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

    return MobypictureRulesElement.extend('MobypictureRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
