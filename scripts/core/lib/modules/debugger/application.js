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
     * @class Application
     * @constructor
     */
    var Application = function Application(debug) {

        /**
         * Define debugger
         * @type {*}
         */
        this.debugger = debug;

        this.configScope();

    };

    return Application.extend({

    }, Actions.prototype);
});
