/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineIcefloeRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Icefloe Rules Element
     * @param view
     * @param opts
     * @returns {IcefloeRulesElement}
     * @constructor
     * @class IcefloeRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var IcefloeRulesElement = function IcefloeRulesElement(view, opts) {

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

    return IcefloeRulesElement.extend('IcefloeRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});