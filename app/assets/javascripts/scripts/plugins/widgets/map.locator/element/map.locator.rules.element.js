/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineMapLocatorRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define MapLocator Rules Element
     * @param view
     * @param opts
     * @returns {MapLocatorRulesElement}
     * @constructor
     * @class MapLocatorRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var MapLocatorRulesElement = function MapLocatorRulesElement(view, opts) {

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

    return MapLocatorRulesElement.extend('MapLocatorRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});