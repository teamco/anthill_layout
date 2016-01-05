/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineWidgetRulesElement(BaseElement) {

    /**
     * Define WidgetRules Element
     * @param view
     * @param opts
     * @returns {WidgetRulesElement}
     * @constructor
     * @class WidgetRulesElement
     * @extends BaseElement
     */
    var WidgetRulesElement = function WidgetRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container
        });

        this.addCSS('widget.rules');
        this.addCSS('rules');

        return this;
    };

    return WidgetRulesElement.extend('WidgetRulesElement', {

    }, BaseElement.prototype);

});