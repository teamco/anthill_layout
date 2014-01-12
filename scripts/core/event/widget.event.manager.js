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

    /**
     * Define widget event manager
     * @class EventManager
     * @constructor
     */
    var EventManager = function EventManager() {

        /**
         * Define events
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @type {{
         *      debugInteractions: {eventName: string, params: {buffer: number}},
         *      initDraggable: string,
         *      enableDraggable: string,
         *      disableDraggable: string,
         *      destroyDraggable: string,
         *      createDraggable: string,
         *      startDraggable: string,
         *      dragDraggable: {eventName: string, params: {buffer: number}},
         *      stopDraggable: string,
         *      initResizable: string,
         *      enableResizable: string,
         *      disableResizable: string,
         *      destroyResizable: string,
         *      createResizable: string,
         *      startResizable: string,
         *      resizeResizable: {eventName: string, params: {buffer: number}},
         *      stopResizable: string,
         *      save: string
         * }}
         *
         */
        this.eventList = {

            /**
             * Debugger events
             */
            debugInteractions: {
                eventName: 'debug.interactions',
                params: { buffer: 1000 }
            },

            /**
             * Drag events
             */
            initDraggable: 'init.draggable',
            enableDraggable: 'enable.draggable',
            disableDraggable: 'disable.draggable',
            destroyDraggable: 'destroy.draggable',
            createDraggable: 'create.draggable',
            startDraggable: 'start.draggable',
            dragDraggable: {
                eventName: 'drag.draggable',
                params: { buffer: 50 }
            },
            stopDraggable: 'stop.draggable',

            /**
             * Resize events
             */
            initResizable: 'init.resizable',
            enableResizable: 'enable.resizable',
            disableResizable: 'disable.resizable',
            destroyResizable: 'destroy.resizable',
            createResizable: 'create.resizable',
            startResizable: 'start.resizable',
            resizeResizable: {
                eventName: 'resize.resizable',
                params: { buffer: 50 }
            },
            stopResizable: 'stop.resizable',

            save: 'save'
        };
    };

    return EventManager.extend({

    }, Event.prototype);
});