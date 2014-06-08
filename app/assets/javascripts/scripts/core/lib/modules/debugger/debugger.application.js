/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */

define([
    'modules/Debugger/debugger.actions'
], function defineDebuggerApplication(Actions) {

    /**
     * Define Debugger Application
     * @param {*} debug
     * @param {App} scope
     * @class DebuggerApp
     * @constructor
     */
    var DebuggerApp = function DebuggerApp(debug, scope) {

        /**
         * Define debugger
         * @type {Debugger}
         */
        this.bugger = debug;

        /**
         * Define scope
         * @type {App}
         */
        this.scope = scope;

        this.configScope();

    };

    return DebuggerApp.extend({

    }, Actions.prototype);
});
