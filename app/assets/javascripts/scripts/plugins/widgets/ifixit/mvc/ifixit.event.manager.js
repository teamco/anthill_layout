/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineIfixitEventManager(WidgetContentEventManager) {

    /**
     * Define Ifixit event manager
     * @class IfixitEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var IfixitEventManager = function IfixitEventManager() {

        this.updateEventList({});
    };

    return IfixitEventManager.extend(
        'IfixitEventManager', {},
        WidgetContentEventManager.prototype
    );
});
