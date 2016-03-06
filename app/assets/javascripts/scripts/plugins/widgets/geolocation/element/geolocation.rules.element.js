/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineGeolocationRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Geolocation Rules Element
     * @param view
     * @param opts
     * @returns {GeolocationRulesElement}
     * @constructor
     * @class GeolocationRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var GeolocationRulesElement = function GeolocationRulesElement(view, opts) {

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

    return GeolocationRulesElement.extend('GeolocationRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});