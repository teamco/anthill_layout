/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineKickStarterRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define KickStarter Rules Element
     * @param view
     * @param opts
     * @returns {KickStarterRulesElement}
     * @constructor
     * @class KickStarterRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var KickStarterRulesElement = function KickStarterRulesElement(view, opts) {

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

    return KickStarterRulesElement.extend('KickStarterRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
