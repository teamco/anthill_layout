/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineRevisionRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Revision Rules Element
     * @param view
     * @param opts
     * @returns {RevisionRulesElement}
     * @constructor
     * @class RevisionRulesElement
     * @extends PluginElement
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

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
