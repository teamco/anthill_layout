/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineRutubeEventManager(WidgetContentEventManager) {

    /**
     * Define Rutube event manager
     * @class RutubeEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var RutubeEventManager = function RutubeEventManager() {

        this.updateEventList({});
    };

    return RutubeEventManager.extend('RutubeEventManager', {

    }, WidgetContentEventManager.prototype);
});