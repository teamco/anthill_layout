/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineEmbedlyRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Embedly Rules Element
     * @param view
     * @param opts
     * @returns {EmbedlyRulesElement}
     * @constructor
     * @class EmbedlyRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var EmbedlyRulesElement = function EmbedlyRulesElement(view, opts) {

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

    return EmbedlyRulesElement.extend('EmbedlyRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
