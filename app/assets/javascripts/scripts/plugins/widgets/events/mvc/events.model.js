/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function defineEventsModel(BaseModel, WidgetContentModel) {

    /**
     * Define Events model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class EventsModel
     * @constructor
     */
    var EventsModel = function EventsModel() {

        /**
         * Define preferences
         * @member EventsModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member EventsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return EventsModel.extend('EventsModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});