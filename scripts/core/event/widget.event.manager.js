/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineWidgetEventManager(Event) {
    var EventManager = function EventManager() {
        this.events = {};
        this.eventList = {
            initDrag: 'init.drag',
            enableDrag: 'enable.drag',
            disableDrag: 'disable.drag',
            destroyDrag: 'destroy.drag',
            initResize: 'init.resize',
            enableResize: 'enable.resize',
            disableResize: 'disable.resize',
            destroyResize: 'destroy.resize',
            debugInteractions: {
                eventName: 'debug.interactions',
                params: { buffer: 1000 }
            },
            /**
             * Drag events
             */
            dragCreate: 'drag.create',
            dragStart: 'drag.start',
            dragOn: {
                eventName: 'drag.on',
                params: { buffer: 50 }
            },
            dragStop: 'drag.stop',
            /**
             * Resize events
             */
            resizeCreate: 'resize.create',
            resizeStart: 'resize.start',
            resizeSticker: {
                eventName: 'resize.sticker',
                params: { buffer: 50 }
            },
            resizeStop: 'resize.stop',
            save: 'save'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});