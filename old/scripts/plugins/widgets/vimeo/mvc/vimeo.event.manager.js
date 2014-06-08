/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineVimeoEventManager(WidgetContentEventManager) {

    /**
     * Define Vimeo event manager
     * @class VimeoEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var VimeoEventManager = function VimeoEventManager() {

        this.updateEventList({});
    };

    return VimeoEventManager.extend('VimeoEventManager', {

    }, WidgetContentEventManager.prototype);
});