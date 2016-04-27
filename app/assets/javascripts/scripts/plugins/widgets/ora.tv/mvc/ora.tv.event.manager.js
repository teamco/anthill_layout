/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineOraTvEventManager(WidgetContentEventManager) {

    /**
     * Define OraTv event manager
     * @class OraTvEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var OraTvEventManager = function OraTvEventManager() {

        this.updateEventList({});
    };

    return OraTvEventManager.extend(
        'OraTvEventManager', {},
        WidgetContentEventManager.prototype
    );
});
