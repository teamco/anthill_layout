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
            this.addContent([
                '<div class="container">',
                '<div class="row">',
                '<div class="col-md-">',
                '<div class="panel panel-primary">',
                '<div class="panel-heading">',
                '<span class="glyphicon glyphicon-comment"></span> Chat',
                '<div class="btn-group pull-right">',
                '<ul class="dropdown-menu slidedown">',
                '<li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-refresh">',
                '</span>Refresh</a></li>',
                '<li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-ok-sign">',
                '</span>Available</a></li>',
                '<li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-remove">',
                '</span>Busy</a></li>',
                '<li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-time"></span>',
                'Away</a></li>',
                '<li class="divider"></li>',
                '<li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-off"></span>',
                'Sign Out</a></li>',
                '</ul></div></div>',
                '<div class="panel-body">',
                '<ul class="chat">',
                '<li class="left clearfix"><span class="chat-img pull-left">',
                '<img src="/assets/demo/participants/1.jpg" alt="User Avatar" class="img-circle" width="64" height="64"/>',
                '</span>',
                '<div class="chat-body clearfix">',
                '<div class="header">',
                '<strong class="primary-font">Naseem Hamed</strong> <small class="pull-right text-muted">',
                '<span class="glyphicon glyphicon-time"></span>30 mins ago</small>',
                '</div>',
                '<p>Hello, Please join this game.. </p>',
                '</div></li>',
                '<li class="right clearfix"><span class="chat-img pull-right">',
                '</span>',
                '<div class="chat-body clearfix">',
                '<div class="header">',
                '<img src="/assets/demo/participants/2.jpg" alt="User Avatar" class="img-circle" width="64" height="64" />',
                '<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>21 mins ago</small>',
                '<strong class="pull-right primary-font">Eyal ben david</strong>',
                '</div>',
                '<p>Hi Nassem. Nice to meet you. waiting to start to play. </p>',
                '</div>',
                '</li>',
                '<li class="left clearfix"><span class="chat-img pull-left">',
                '<img src="/assets/demo/participants/1.jpg" alt="User Avatar" class="img-circle" width="64" height="64"/>',
                '</span>',
                '<div class="chat-body clearfix">',
                '<div class="header">',
                '<strong class="primary-font">Naseem Hamed</strong> <small class="pull-right text-muted">',
                '<span class="glyphicon glyphicon-time"></span>14 mins ago</small>',
                '</div>',
                '<p>Welcome eyal. </p>',
                '</div></li>',
                '<div class="chat-body clearfix">',
                '<div class="header">',
                '<img src="/assets/demo/participants/3.jpg" alt="User Avatar" class="img-circle" width="64" height="64"/>',
                '<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>15 mins ago</small>',
                '<strong class="pull-right primary-font">Arkan Shalaban</strong>',
                '</div>',
                '<p>Hello meet you shortly.</p>',
                '</div>',
                '</li>',
                '<div class="panel-footer">',
                '<div class="input-group">',
                '<input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." />',
                '<span class="input-group-btn">',
                '<button class="btn btn-warning btn-sm" id="btn-chat">Send</button>',
                '</span></div></div></div></div></div></div>'
            ].join(''))
        }

    }, PluginElement.prototype);
});
