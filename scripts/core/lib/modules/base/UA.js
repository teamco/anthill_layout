/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/2/13
 * Time: 6:35 PM
 * To change this template use File | Settings | File Templates.
 */

define(['modules/base'], function defineBaseString(Base) {
    var BaseUserAgent = function BaseUserAgent() {
        this.browser = {
            mozilla: /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase()),
            webkit: /webkit/.test(navigator.userAgent.toLowerCase()),
            opera: /opera/.test(navigator.userAgent.toLowerCase()),
            msie: /msie/.test(navigator.userAgent.toLowerCase())
        };
    };

    BaseUserAgent.extend({

    }, Base);

    Base.prototype.lib.ua = new BaseUserAgent();

});