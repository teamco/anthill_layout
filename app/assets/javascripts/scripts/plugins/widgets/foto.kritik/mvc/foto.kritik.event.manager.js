/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFotoKritikEventManager(WidgetContentEventManager) {

    /**
     * Define FotoKritik event manager
     * @class FotoKritikEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FotoKritikEventManager = function FotoKritikEventManager() {

        this.updateEventList({});
    };

    return FotoKritikEventManager.extend('FotoKritikEventManager', {

    }, WidgetContentEventManager.prototype);
});
