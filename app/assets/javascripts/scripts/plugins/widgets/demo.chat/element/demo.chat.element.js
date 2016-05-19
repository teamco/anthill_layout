/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineDemoChatElement(PluginElement) {

    /**
     * Define DemoChat Element
     * @param view
     * @param opts
     * @returns {DemoChatElement}
     * @constructor
     * @class DemoChatElement
     * @extends PluginElement
     */
    var DemoChatElement = function DemoChatElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('demo.chat', {resource: '/widgets'});

        return this;
    };

    return DemoChatElement.extend('DemoChatElement', {

        /**
         * Render Embedded content
         * @memberOf DemoChatElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            (function () {
                window.controller = {
                    onSendPressed: function () {
                        var btn = $('#btn-input');
                        var txt = btn.val();

                        if (txt.indexOf('shit') > -1 || txt.indexOf('hate') > -1) {
                            btn.val('You use inappropriate language. The text wasn\'t sent').addClass('red');
                            setTimeout(function () {
                                btn.val('');
                            }, 2000);
                            return;
                        }
                        btn.removeClass('red');
                        var entryMe = '<li class="left clearfix"><span class="chat-img pull-right"><img src="/assets/demo/participants/4.jpg" width="64" height="64" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">{name}</strong> <small class="pull-left text-muted"><span class="glyphicon glyphicon-time"></span>{time}</small></div><p>{content}</p></div></li>'
                        entryMe = entryMe.replace('{name}', 'Super Pavel');
                        entryMe = entryMe.replace('{time}', '1 mins ago');
                        entryMe = entryMe.replace('{content}', txt);
                        $('.chat').append(entryMe);
                        setTimeout(window.controller.response, 3000);
                    },

                    response: function () {
                        var entryOther = '<li class="right clearfix"><span class="chat-img pull-left"><img src="/assets/demo/participants/1.jpg" width="64" height="64" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">{name}</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>{time}</small></div><p>{content}</p></div></li>'
                        entryOther = entryOther.replace('{name}', 'ronaldo7');
                        entryOther = entryOther.replace('{time}', '1 sec ago');
                        entryOther = entryOther.replace('{content}', 'hello pavel, Great that you join the game.');
                        $('.chat').append(entryOther);
                    },

                    translate: function () {
                        var ar = ['مرحبا، يرجى الانضمام إلى هذه اللعبة ..', 'مرحبا ronaldo7. تشرفت بمقابلتك. الانتظار لبدء اللعب', 'أهلا بك mesi', 'مرحبا مقابلتك قريبا.', 'اراك قريبا', 'سعيد لمقابلتك', 'مرحبا pavel، العظيم أن تنضم إلى لعبة.', 'مرحبا', 'مرحبا'], i;
                        var children = $('.chat').children();
                        for (i = 0; i < children.length; i++) {
                            var chatRow = children[i];
                            $(chatRow).find('p').text(ar[i]);
                        }
                    }
                }
            })
            ();

            this.addContent([
                '<div class="container">' +
                '  <div class="row">' +
                ' <div class="col-md-">' +
                '<div class="panel panel-primary">' +
                '<div class="panel-heading">' +
                ' <span class="glyphicon glyphicon-comment"></span> Chat</div>' +
                ' <div class="panel-body">' +
                ' <div class="panel-body">' +
                '<ul class="chat">' +
                '<li class="left clearfix"><span class="chat-img pull-left">' +
                '<img src="/assets/demo/participants/1.jpg" width="64" height="64" alt="User Avatar" class="img-circle" />' +
                '  </span>' +
                '<div class="chat-body clearfix">' +
                '<div class="header">' +
                '<strong class="primary-font">ronaldo7</strong> <small class="pull-right text-muted">' +
                '<span class="glyphicon glyphicon-time"></span>30 mins ago</small>' +
                ' </div>' +
                ' <p>Hello, Please join this game.. </p>' +
                ' </div>' +
                ' </li>' +
                '<li class="right clearfix"><span class="chat-img pull-right">' +
                '<img src="/assets/demo/participants/2.jpg" width="64" height="64" alt="User Avatar" class="img-circle" />' +
                '</span>' +
                ' <div class="chat-body clearfix">' +
                ' <div class="header">' +
                ' <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>21 mins ago</small>' +
                '<strong class="pull-right primary-font">Mesi</strong>' +
                ' </div>' +
                '<p>Hi ronaldo7. Nice to meet you. waiting to start to play.</p>' +
                ' </div>' +
                ' </li>' +
                ' <li class="left clearfix"><span class="chat-img pull-left">' +
                '  <img src="/assets/demo/participants/1.jpg" width="64" height="64" alt="User Avatar" class="img-circle" />' +
                '</span>' +
                '<div class="chat-body clearfix">' +
                ' <div class="header">' +
                '<strong class="primary-font">ronaldo7</strong> <small class="pull-right text-muted">' +
                '<span class="glyphicon glyphicon-time"></span>16 mins ago</small>' +
                ' </div>' +
                '  <p>Welcome mesi.</p>' +
                ' </div>' +
                ' </li>' +
                ' <li class="right clearfix"><span class="chat-img pull-right">' +
                '  <img src="/assets/demo/participants/3.jpg" width="64" height="64" alt="User Avatar" class="img-circle" />' +
                ' </span>' +
                ' <div class="chat-body clearfix">' +
                '  <div class="header">' +
                '  <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>10 mins ago</small>' +
                '  <strong class="pull-right primary-font">wonder woman</strong>' +
                ' </div>' +
                ' <p>Hello everyone.</p>' +
                ' </div>' +
                ' </li>' +
                '</ul>' +
                ' </div>' +
                '<div class="panel-footer">' +
                '<div class="input-group">' +
                '<input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." />' +
                '<span class="input-group-btn">' +
                '<button onclick="controller.onSendPressed()" class="btn btn-warning btn-sm" id="btn-chat">Send</button>' +
                ' </span>' +
                '  </div>' +
                ' </div>' +
                ' </div>' +
                '  </div>' +
                '  </div>' +
                '</div>'

            ].join(''));

            $('.panel-heading', this.$).on(
                'click',
                function () {
                    controller.translate();
                }
            );
        }

    }, PluginElement.prototype);
});
