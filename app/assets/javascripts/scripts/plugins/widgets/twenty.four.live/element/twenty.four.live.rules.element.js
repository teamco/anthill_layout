/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTwentyFourLiveRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define TwentyFourLive Rules Element
     * @param view
     * @param opts
     * @returns {TwentyFourLiveRulesElement}
     * @constructor
     * @class TwentyFourLiveRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TwentyFourLiveRulesElement = function TwentyFourLiveRulesElement(view, opts) {

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

    return TwentyFourLiveRulesElement.extend('TwentyFourLiveRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
