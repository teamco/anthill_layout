/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineCoubRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Coub Rules Element
     * @param view
     * @param opts
     * @returns {CoubRulesElement}
     * @constructor
     * @class CoubRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var CoubRulesElement = function CoubRulesElement(view, opts) {

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

    return CoubRulesElement.extend('CoubRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
