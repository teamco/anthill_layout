/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineCacooEventManager(WidgetContentEventManager) {

    /**
     * Define Cacoo event manager
     * @class CacooEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var CacooEventManager = function CacooEventManager() {

        this.updateEventList({});
    };

    return CacooEventManager.extend(
        'CacooEventManager', {},
        WidgetContentEventManager.prototype
    );
});
