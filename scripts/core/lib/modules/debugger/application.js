/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */

define([
    'modules/debugger/actions'
], function defineDebuggerApplication(Actions) {

    /**
     * Define Debugger Application
     * @param {*} debug
     * @param {App} scope
     * @class Application
     * @constructor
     */
    var App = function App(debug, scope) {

        /**
         * Define debugger
         * @type {*}
         */
        this.debugger = debug;

        /**
         * Define scope
         * @type {App}
         */
        this.scope = scope;

        this.configScope();

    };

    return App.extend({

    }, Actions.prototype);
});
