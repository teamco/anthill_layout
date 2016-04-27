/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineInfogrAmEventManager(WidgetContentEventManager) {

    /**
     * Define InfogrAm event manager
     * @class InfogrAmEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var InfogrAmEventManager = function InfogrAmEventManager() {

        this.updateEventList({});
    };

    return InfogrAmEventManager.extend(
        'InfogrAmEventManager', {},
        WidgetContentEventManager.prototype
    );
});
