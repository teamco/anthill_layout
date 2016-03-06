/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePostTemplateRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define PostTemplate Rules Element
     * @param view
     * @param opts
     * @returns {PostTemplateRulesElement}
     * @constructor
     * @class PostTemplateRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PostTemplateRulesElement = function PostTemplateRulesElement(view, opts) {

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

    return PostTemplateRulesElement.extend('PostTemplateRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});