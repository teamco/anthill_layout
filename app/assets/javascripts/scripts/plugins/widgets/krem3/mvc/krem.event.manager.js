/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineKremEventManager(WidgetContentEventManager) {

    /**
     * Define Krem event manager
     * @class KremEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var KremEventManager = function KremEventManager() {

        this.updateEventList({});
    };

    return KremEventManager.extend('KremEventManager', {

    }, WidgetContentEventManager.prototype);
});
