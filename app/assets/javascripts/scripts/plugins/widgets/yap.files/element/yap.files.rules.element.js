/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineYapFilesRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define YapFiles Rules Element
     * @param view
     * @param opts
     * @returns {YapFilesRulesElement}
     * @constructor
     * @class YapFilesRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var YapFilesRulesElement = function YapFilesRulesElement(view, opts) {

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

    return YapFilesRulesElement.extend('YapFilesRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
