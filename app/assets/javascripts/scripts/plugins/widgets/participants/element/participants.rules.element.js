/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineParticipantsRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Participants Rules Element
     * @param view
     * @param opts
     * @returns {ParticipantsRulesElement}
     * @constructor
     * @class ParticipantsRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var ParticipantsRulesElement = function ParticipantsRulesElement(view, opts) {

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

    return ParticipantsRulesElement.extend(
        'ParticipantsRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
