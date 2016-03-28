/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineEventsCalendarRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define EventsCalendar Rules Element
     * @param view
     * @param opts
     * @returns {EventsCalendarRulesElement}
     * @constructor
     * @class EventsCalendarRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var EventsCalendarRulesElement = function EventsCalendarRulesElement(view, opts) {

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

    return EventsCalendarRulesElement.extend('EventsCalendarRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
