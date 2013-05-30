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
     * @class Workspace
     * @constructor
     */
    var Workspace = function Workspace(debug) {

        /**
         * Define debugger
         * @type {*}
         */
        this.debugger = debug;

        this.configScope();

    };

    return Workspace.extend({

    }, Actions.prototype);
});
