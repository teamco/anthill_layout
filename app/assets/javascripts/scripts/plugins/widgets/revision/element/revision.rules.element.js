/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineRevisionRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Revision Rules Element
     * @param view
     * @param opts
     * @returns {RevisionRulesElement}
     * @constructor
     * @class RevisionRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var RevisionRulesElement = function RevisionRulesElement(view, opts) {

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

    return RevisionRulesElement.extend('RevisionRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
