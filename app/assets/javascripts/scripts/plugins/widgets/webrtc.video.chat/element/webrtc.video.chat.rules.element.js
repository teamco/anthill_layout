/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineWebrtcVideoChatRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define WebrtcVideoChat Rules Element
     * @param view
     * @param opts
     * @returns {WebrtcVideoChatRulesElement}
     * @constructor
     * @class WebrtcVideoChatRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var WebrtcVideoChatRulesElement = function WebrtcVideoChatRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBaseRulesData(
            opts.data,
            opts.rules.widget,
            opts.rules.content
        );

        return this;
    };

    return WebrtcVideoChatRulesElement.extend('WebrtcVideoChatRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});