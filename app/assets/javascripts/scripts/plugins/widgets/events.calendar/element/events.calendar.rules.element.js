/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineEventsCalendarRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define EventsCalendar Rules Element
     * @param view
     * @param opts
     * @returns {EventsCalendarRulesElement}
     * @constructor
     * @class EventsCalendarRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var EventsCalendarRulesElement = function EventsCalendarRulesElement(view, opts) {

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

    return EventsCalendarRulesElement.extend('EventsCalendarRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
