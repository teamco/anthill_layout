/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineTitleEventManager(WidgetContentEventManager) {

    /**
     * Define Title event manager
     * @class TitleEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var TitleEventManager = function TitleEventManager() {

        this.updateEventList({});
    };

    return TitleEventManager.extend(
        'TitleEventManager', {},
        WidgetContentEventManager.prototype
    );
});
