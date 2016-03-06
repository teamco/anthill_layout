/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineJwplayerRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Jwplayer Rules Element
     * @param view
     * @param opts
     * @returns {JwplayerRulesElement}
     * @constructor
     * @class JwplayerRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var JwplayerRulesElement = function JwplayerRulesElement(view, opts) {

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

    return JwplayerRulesElement.extend('JwplayerRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});