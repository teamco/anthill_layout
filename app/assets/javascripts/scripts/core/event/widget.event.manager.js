/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
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
         *      loadPreferences: string,
         *      transferPreferences: string,
         *      setContent: string,
         *      adoptDimensions: string,
         *      restoreLayerIndex: string,
         *      setLayerUp: string,
         *      setLayerDown: string,
         *      setAlwaysOnTop: string,
         *      setOnClickUrl: string,
         *      clearThumbnail: string,
         *      saveDom: string,
         *      afterMaximize: string,
         *      beforeMaximize: string,
         *      afterReduce: string,
         *      beforeReduce: string,
         *      enlargeWidget: string,
         *      reduceWidget: string,
         *      stretchHeight: string,
         *      stretchWidth: string,
         *      unsetStick: string,
         *      setStickToCenterLeft: string,
         *      setStickToCenterTop: string,
         *      setStickToCenter: string,
         *      setStickToCenterBottom: string,
         *      setStickToCenterRight: string,
         *      setStickToTopLeft: string,
         *      setStickToBottomLeft: string,
         *      setStickToTopRight: string,
         *      setStickToBottomRight: string,
         *      restoreWidgetSticker: string
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

            loadPreferences: 'load.preferences',
            transferPreferences: 'transfer.preferences',

            setLayerUp: 'set.layer.up',
            setLayerDown: 'set.layer.down',
            restoreLayerIndex: 'restore.layer.index',
            updateLayerIndex: 'update.layer.index',
            setAlwaysOnTop: 'set.always.on.top',

            setOnClickUrl: 'set.on.click.url',
            clearThumbnail: 'clear.thumbnail',

            saveDom: 'save.dom',

            enlargeWidget: 'enlarge.widget',
            reduceWidget: 'reduce.widget',

            afterMaximize: 'after.maximize',
            beforeMaximize: 'before.maximize',

            afterReduce: 'after.reduce',
            beforeReduce: 'before.reduce',

            stretchHeight: 'stretch.height',
            stretchWidth: 'stretch.width',

            unsetStick: 'unset.stick',
            setStickToCenterLeft: 'set.stick.to.center.left',
            setStickToCenterTop: 'set.stick.to.center.top',
            setStickToCenter: 'set.stick.to.center',
            setStickToCenterBottom: 'set.stick.to.center.bottom',
            setStickToCenterRight: 'set.stick.to.center.right',
            setStickToTopLeft: 'set.stick.to.top.left',
            setStickToBottomLeft: 'set.stick.to.bottom.left',
            setStickToTopRight: 'set.stick.to.top.right',
            setStickToBottomRight: 'set.stick.to.bottom.right',

            restoreWidgetSticker: 'restore.widget.sticker'
        }

    }, BaseEvent.prototype);
});