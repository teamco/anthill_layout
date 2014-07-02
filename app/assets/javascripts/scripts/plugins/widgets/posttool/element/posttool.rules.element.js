/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePosttoolRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Posttool Rules Element
     * @param view
     * @param opts
     * @returns {PosttoolRulesElement}
     * @constructor
     * @class PosttoolRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PosttoolRulesElement = function PosttoolRulesElement(view, opts) {

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

    return PosttoolRulesElement.extend('PosttoolRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});