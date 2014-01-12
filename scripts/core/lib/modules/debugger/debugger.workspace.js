/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */

define([
    'modules/debugger/debugger.actions'
], function defineDebuggerWorkspace(Actions) {

    /**
     * Define Debugger Workspace
     * @param {*} debug
     * @param {Workspace} scope
     * @class DebuggerWorkspace
     * @constructor
     */
    var DebuggerWorkspace = function DebuggerWorkspace(debug, scope) {

        /**
         * Define debugger
         * @type {Debugger}
         */
        this.debugger = debug;

        /**
         * Define scope
         * @type {Workspace}
         */
        this.scope = scope;

        this.configScope();

    };

    return DebuggerWorkspace.extend({

    }, Actions.prototype);
});
