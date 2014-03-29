/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/rules/widget.rules'
], function defineYoutubeRulesElement(BaseElement, WidgetRules) {

    /**
     * Define Youtube Rules Element
     * @param view
     * @param opts
     * @returns {YoutubeRulesElement}
     * @constructor
     * @class YoutubeRulesElement
     * @extends BaseElement
     * @extends WidgetRules
     */
    var YoutubeRulesElement = function YoutubeRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts.data);

        return this;
    };

    return YoutubeRulesElement.extend('YoutubeRulesElement', {


    }, BaseElement.prototype, WidgetRules.prototype);

});