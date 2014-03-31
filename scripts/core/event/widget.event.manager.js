/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineWidgetEventManager(BaseEvent) {

    /**
     * Define widget event manager
     * @class WidgetEventManager
     * @constructor
     * @extends BaseEvent
     */
    var WidgetEventManager = function WidgetEventManager() {

        /**
         * Define events
         * @member WidgetEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return WidgetEventManager.extend('WidgetEventManager', {

        /**
         * Define event list
         * @memberOf WidgetEventManager
         * @type {{
         *      initDraggable: string,
         *      enableDraggable: string,
         *      disableDraggable: string,
         *      destroyDraggable: string,
         *      createDraggable: string,
         *      startDraggable: string,
         *      dragDraggable: {eventName: string, params: {buffer: number}},
         *      stopDraggable: string,
         *      updateDraggable: string,
         *      initResizable: string,
         *      enableResizable: string,
         *      disableResizable: string,
         *      destroyResizable: string,
         *      createResizable: string,
         *      startResizable: string,
         *      resizeResizable: {eventName: string, params: {buffer: number}},
         *      stopResizable: string,
         *      updateResizable: string,
         *      loadContent: string,
         *      setContent: string,
         *      adoptDimensions: string,
         *      saveDom: string
         * }}
         */
        eventList: {

            // Drag events
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
            updateDraggable: 'update.draggable',

            // Resize events
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
            updateResizable: 'update.resizable',

            adoptDimensions: 'adopt.dimensions',

            loadContent: 'load.content',
            setContent: 'set.content',

            saveDom: 'save.dom'
        }

    }, BaseEvent.prototype);
});