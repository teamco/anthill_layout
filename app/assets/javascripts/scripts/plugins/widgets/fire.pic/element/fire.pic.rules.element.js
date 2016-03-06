/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFirePicRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define FirePic Rules Element
     * @param view
     * @param opts
     * @returns {FirePicRulesElement}
     * @constructor
     * @class FirePicRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var FirePicRulesElement = function FirePicRulesElement(view, opts) {

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

    return FirePicRulesElement.extend('FirePicRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
