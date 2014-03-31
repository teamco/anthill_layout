/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/rules/widget.base.rules'
], function defineYoutubeRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Youtube Rules Element
     * @param view
     * @param opts
     * @returns {YoutubeRulesElement}
     * @constructor
     * @class YoutubeRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var YoutubeRulesElement = function YoutubeRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(
            opts.data,
            opts.rules.widget,
            opts.rules.content
        );

        return this;
    };

    return YoutubeRulesElement.extend('YoutubeRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});