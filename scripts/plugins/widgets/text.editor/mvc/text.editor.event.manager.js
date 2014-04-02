/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineTextEditorEventManager(BaseEvent) {

    /**
     * Define TextEditor event manager
     * @class TextEditorEventManager
     * @constructor
     * @extends BaseEvent
     */
    var TextEditorEventManager = function TextEditorEventManager() {

        /**
         * Define events
         * @member TextEditorEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member TextEditorEventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      defineReferrer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferPreferences: string,
         *      loadRules: string,
         *      publishRule: string,
         *      registerRules: string,
         *      transferRules: string
         * }}
         */
        this.eventList = {
            initWidget: 'init.widget',
            updateTranslations: 'update.translations',
            defineContainer: 'define.container',
            defineReferrer: 'define.referrer',
            setEmbeddedContent: 'set.embedded.content',
            loadPreferences: 'load.preferences',
            transferPreferences: 'transfer.preferences',
            loadRules: 'load.rules',
            publishRule: 'publish.rule',
            registerRules: 'register.rules',
            transferRules: 'transfer.rules',
            provideStats: 'provide.stats'
        };
    };

    return TextEditorEventManager.extend('TextEditorEventManager', {
    }, BaseEvent.prototype);
});