/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineOfficeMixEventManager(WidgetContentEventManager) {

    /**
     * Define OfficeMix event manager
     * @class OfficeMixEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var OfficeMixEventManager = function OfficeMixEventManager() {

        this.updateEventList({});
    };

    return OfficeMixEventManager.extend(
        'OfficeMixEventManager', {},
        WidgetContentEventManager.prototype
    );
});
