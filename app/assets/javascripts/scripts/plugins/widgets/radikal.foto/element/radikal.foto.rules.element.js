/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineRadikalFotoRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define RadikalFoto Rules Element
     * @param view
     * @param opts
     * @returns {RadikalFotoRulesElement}
     * @constructor
     * @class RadikalFotoRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var RadikalFotoRulesElement = function RadikalFotoRulesElement(view, opts) {

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

    return RadikalFotoRulesElement.extend('RadikalFotoRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
