/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineLivestreamRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Livestream Rules Element
     * @param view
     * @param opts
     * @returns {LivestreamRulesElement}
     * @constructor
     * @class LivestreamRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var LivestreamRulesElement = function LivestreamRulesElement(view, opts) {

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

    return LivestreamRulesElement.extend('LivestreamRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
