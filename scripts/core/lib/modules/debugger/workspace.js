/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */

define([
    'modules/debugger/actions'
], function defineDebuggerWorkspace(Actions) {

    /**
     * Define Debugger Workspace
     * @param {*} debug
     * @param {Workspace} scope
     * @class Workspace
     * @constructor
     */
    var Workspace = function Workspace(debug, scope) {

        /**
         * Define debugger
         * @type {*}
         */
        this.debugger = debug;

        /**
         * Define scope
         * @type {Workspace}
         */
        this.scope = scope;

        this.configScope();

    };

    return Workspace.extend({

    }, Actions.prototype);
});
