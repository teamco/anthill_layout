/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineVideoPayNetRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define VideoPayNet Rules Element
     * @param view
     * @param opts
     * @returns {VideoPayNetRulesElement}
     * @constructor
     * @class VideoPayNetRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var VideoPayNetRulesElement = function VideoPayNetRulesElement(view, opts) {

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

    return VideoPayNetRulesElement.extend('VideoPayNetRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
