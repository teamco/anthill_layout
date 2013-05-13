/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:43 PM
 */
define([], function defineDebuggerTabs() {

    /**
     * Define Debugger Tabs
     * @constructor
     */
    var Tabs = function Tabs() {
    };

    return Tabs.extend({

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

            $div.find('div > fieldset').hide();
            $info.find('fieldset').show();
            $info.show().children('ul').stop().slideDown(500);
            $div.find('ul.info-tabs li').removeClass('this');
            $tab.addClass('this');
        },

        /**
         * Hover info window
         * @param {Number} opacityOff
         */
        bindHover: function bindHover(opacityOff) {
            $(this.debugger.info).hover(
                function on() {
                    $(this).css({
                        opacity: 0.9
                    }).find('.info-tabs').stop().animate({
                            right: -100
                        });
                },
                function off() {
                    $(this).css({
                        opacity: opacityOff
                    }).find('.info-tabs').stop().animate({
                            right: 0
                        });
                }
            );
        }

    });

});