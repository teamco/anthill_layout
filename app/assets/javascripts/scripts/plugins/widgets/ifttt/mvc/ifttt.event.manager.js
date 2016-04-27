/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineIftttEventManager(WidgetContentEventManager) {

    /**
     * Define Ifttt event manager
     * @class IftttEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var IftttEventManager = function IftttEventManager() {

        this.updateEventList({});
    };

    return IftttEventManager.extend(
        'IftttEventManager', {},
        WidgetContentEventManager.prototype
    );
});
