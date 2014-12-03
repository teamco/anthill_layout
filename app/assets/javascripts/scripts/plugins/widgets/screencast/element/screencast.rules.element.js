/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineScreencastRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Screencast Rules Element
     * @param view
     * @param opts
     * @returns {ScreencastRulesElement}
     * @constructor
     * @class ScreencastRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ScreencastRulesElement = function ScreencastRulesElement(view, opts) {

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

    return ScreencastRulesElement.extend('ScreencastRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
