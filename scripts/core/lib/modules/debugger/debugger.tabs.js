/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:43 PM
 */
define([], function defineDebuggerTabs() {

    /**
     * Define Debugger Tabs
     * @param {*} debug
     * @param {Boolean} pin
     * @param {Number} opacityOff
     * @class DebuggerTabs
     * @constructor
     */
    var DebuggerTabs = function DebuggerTabs(debug, pin, opacityOff) {

        /**
         * Define debugger
         * @type {Debugger}
         */
        this.debugger = debug;

        /**
         * Define pin state
         * @type {Boolean}
         */
        this.pinTabs = pin;

        /**
         * Hover opacity off
         * @type {Number}
         */
        this.opacityOff = opacityOff;
    };

    return DebuggerTabs.extend({

        /**
         * Render Info tabs
         * @param $div
         */
        renderTabs: function renderTabs($div) {
            var $tabs = $('<ul />').addClass('info-tabs');
            $.each(this.debugger.links, function eachTabs(i, v) {
                $tabs.append(
                    $('<li />').attr({
                        title: v
                    }).text(v).on('click.tab', this.openTab.bind(this))
                )
            }.bind(this));

            $tabs.appendTo($div);

            this.bindHover();
            this.renderPin();

            if (this.pinTabs) {
                this.open();
            }
        },

        /**
         * Render pin
         */
        renderPin: function renderPin() {
            var $pin = $('<div />').
                addClass('pin').
                addClass(this.pinTabs ? 'active' : '').
                attr({
                    title: this.pinTabs ? 'Pin tabs' : 'Unpin tabs'
                });

            $pin.appendTo($('.handler', this.info));

            this._bindPin($pin);
        },

        /**
         * Bind open/close
         * @param $pin
         * @private
         */
        _bindPin: function _bindPin($pin) {
            $pin.on(
                'click.pin',
                /**
                 * Bind click
                 */
                function clickPin(e) {
                    this.pinTabs ?
                        this.unpin($pin) :
                        this.pin($pin);
                }.bind(this)
            );
        },

        /**
         * Unbind open/close
         * @param $pin
         * @private
         */
        _unbindPin: function _unbindPin($pin) {
            $pin.unbind('click.pin').
                removeClass('active').
                addClass('disabled');
        },

        /**
         * Pin tabs
         * @param $pin
         */
        pin: function pin($pin) {
            this.pinTabs = true;
            $pin.removeClass('disabled').
                addClass('active');
        },

        /**
         * Unpin tabs
         * @param $pin
         */
        unpin: function unpin($pin) {
            this.pinTabs = false;
            $pin.removeClass('active disabled');
        },

        /**
         * Open selected tab
         * @param {{target}} e
         */
        openTab: function openTab(e) {
            var $div = $(this.debugger.info),
                $tab = $(e.target),
                $info = $div.find('fieldset[class^="' +
                    $tab.text().toLowerCase() + '"]');

            this.debugger.scope.logger.debug([
                'Open', $tab.text(), 'tab'
            ].join(' '));

            $div.find('div > fieldset').hide();
            $info.find('fieldset').show();
            $info.show().children('ul').stop().slideDown(500);
            $div.find('ul.info-tabs li').removeClass('this');
            $tab.addClass('this');
        },

        /**
         * Hover info window
         */
        bindHover: function bindHover() {
            $(this.debugger.info).hover(
                this.open.bind(this),
                this.close.bind(this)
            );
        },

        /**
         * Open tabs
         */
        open: function open() {
            this._animateOpenTabs(0.9, -100);
        },

        /**
         * Close tabs
         * @returns {boolean}
         */
        close: function close() {
            if (this.pinTabs) {
                return false;
            }
            this._animateOpenTabs(this.opacityOff, 0);
        },

        /**
         * Animate tabs
         * @param {Number} opacity
         * @param {Number} right
         * @private
         */
        _animateOpenTabs: function _animateOpenTabs(opacity, right) {
            $('.info-tabs', this.debugger.info).css({
                opacity: opacity
            }).stop().animate({
                    right: right
                });
        }

    });

});