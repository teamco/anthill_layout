/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineEspresoTvRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define EspresoTv Rules Element
     * @param view
     * @param opts
     * @returns {EspresoTvRulesElement}
     * @constructor
     * @class EspresoTvRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var EspresoTvRulesElement = function EspresoTvRulesElement(view, opts) {

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

    return EspresoTvRulesElement.extend('EspresoTvRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
