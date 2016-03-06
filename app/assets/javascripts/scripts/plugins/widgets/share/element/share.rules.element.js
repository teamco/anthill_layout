/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineShareRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Share Rules Element
     * @param view
     * @param opts
     * @returns {ShareRulesElement}
     * @constructor
     * @class ShareRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ShareRulesElement = function ShareRulesElement(view, opts) {

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

    return ShareRulesElement.extend('ShareRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});