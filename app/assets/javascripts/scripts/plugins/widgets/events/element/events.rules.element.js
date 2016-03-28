/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineEventsRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Events Rules Element
     * @param view
     * @param opts
     * @returns {EventsRulesElement}
     * @constructor
     * @class EventsRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var EventsRulesElement = function EventsRulesElement(view, opts) {

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

    return EventsRulesElement.extend('EventsRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});