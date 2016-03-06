/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineAvatarRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Avatar Rules Element
     * @param view
     * @param opts
     * @returns {AvatarRulesElement}
     * @constructor
     * @class AvatarRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var AvatarRulesElement = function AvatarRulesElement(view, opts) {

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

    return AvatarRulesElement.extend('AvatarRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});