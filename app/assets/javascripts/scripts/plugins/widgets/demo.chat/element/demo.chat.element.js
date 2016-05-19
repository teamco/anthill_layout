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
            this.addContent(
             '<divclass="container"><divclass="row"><divclass="col-md-5"><divclass="panel panel-primary"><divclass="panel-heading"><spanclass="glyphicon glyphicon-comment"></span>Chat</div><divclass="btn-group pull-right">,<ulclass="dropdown-menu slidedown">,<li><ahref="http://www.jquery2dotnet.com"><spanclass="glyphicon glyphicon-refresh">,</span>Refresh</a></li>,<li><ahref="http://www.jquery2dotnet.com"><spanclass="glyphicon glyphicon-ok-sign">,</span>Available</a></li>,<li><ahref="http://www.jquery2dotnet.com"><spanclass="glyphicon glyphicon-remove">,</span>Busy</a></li>,<li><ahref="http://www.jquery2dotnet.com"><spanclass="glyphicon glyphicon-time"></span>,Away</a></li>,<liclass="divider"></li>,<li><ahref="http://www.jquery2dotnet.com"><spanclass="glyphicon glyphicon-off"></span>,SignOut</a></li>,</ul></div></div>,<divclass="panel-body">,<divclass="panel-body"><ulclass="chat"><liclass="left clearfix"><spanclass="chat-img pull-left"><imgsrc="/assets/demo/participants/1.jpg"alt="User Avatar"class="img-circle"/></span><divclass="chat-body clearfix"><divclass="header"><strongclass="primary-font">ronaldo7</strong><smallclass="pull-right text-muted"><spanclass="glyphicon glyphicon-time"></span>30minsago</small></div><p>Hello,Pleasejointhisgame..</p></div></li><liclass="right clearfix"><spanclass="chat-img pull-right"><imgsrc="/assets/demo/participants/2.jpg"alt="User Avatar"class="img-circle"/></span><divclass="chat-body clearfix"><divclass="header"><smallclass=" text-muted"><spanclass="glyphicon glyphicon-time"></span>21minsago</small><strongclass="pull-right primary-font">Mesi</strong></div><p>Hironaldo7.Nicetomeetyou.waitingtostarttoplay.</p></div></li><liclass="left clearfix"><spanclass="chat-img pull-left"><imgsrc="/assets/demo/participants/1.jpg"alt="User Avatar"class="img-circle"/></span><divclass="chat-body clearfix"><divclass="header"><strongclass="primary-font">ronaldo7</strong><smallclass="pull-right text-muted"><spanclass="glyphicon glyphicon-time"></span>16minsago</small></div><p>Welcomemesi.</p></div></li><liclass="right clearfix"><spanclass="chat-img pull-right"><imgsrc="/assets/demo/participants/3.jpg"alt="User Avatar"class="img-circle"/></span><divclass="chat-body clearfix"><divclass="header"><smallclass=" text-muted"><spanclass="glyphicon glyphicon-time"></span>10minsago</small><strongclass="pull-right primary-font">wonderwoman</strong></div><p>Hellomeetyoushortly.</p></div></li></ul></div><divclass="panel-footer"><divclass="input-group"><inputid="btn-input"type="text"class="form-control input-sm"placeholder="Type your message here..."/><spanclass="input-group-btn"><buttonclass="btn btn-warning btn-sm"id="btn-chat">Send</button></span></div></div></div></div></div></div>'
            );
        }

    }, PluginElement.prototype);
});
