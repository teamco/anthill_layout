/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFapaTvEventManager(WidgetContentEventManager) {

    /**
     * Define FapaTv event manager
     * @class FapaTvEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FapaTvEventManager = function FapaTvEventManager() {

        this.updateEventList({});
    };

    return FapaTvEventManager.extend('FapaTvEventManager', {

    }, WidgetContentEventManager.prototype);
});
