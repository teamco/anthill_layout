/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/workspace/wrapper'
], function defineWorkspaceView(BaseView, Wrapper){

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        wrapper: function wrapper() {
            console.log(this)
            this.elements.$wrapper = new Wrapper(this, {
                id: this.scope.config.uuid + '-wrapper',
                style: 'wrapper',
                $container: this.scope.config.html.containerSelector
            });

        },
        render: function render() {
            this.wrapper();
        }
    }, BaseView.prototype)

});