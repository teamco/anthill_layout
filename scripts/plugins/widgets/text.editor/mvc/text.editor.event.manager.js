/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineTextEditorEventManager(WidgetContentEventManager) {

    /**
     * Define TextEditor event manager
     * @class TextEditorEventManager
     * @constructor
     * @extends WidgetContentEventManager
     * @extends BaseEvent
     */
    var TextEditorEventManager = function TextEditorEventManager() {

        this.updateEventList({});
    };

    return TextEditorEventManager.extend('TextEditorEventManager', {

    }, WidgetContentEventManager.prototype);
});