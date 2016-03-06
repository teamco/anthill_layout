/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineEventsRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Events Rules Element
     * @param view
     * @param opts
     * @returns {EventsRulesElement}
     * @constructor
     * @class EventsRulesElement
     * @extends BaseElement
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

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});