/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineSoundCloudRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define SoundCloud Rules Element
     * @param view
     * @param opts
     * @returns {SoundCloudRulesElement}
     * @constructor
     * @class SoundCloudRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var SoundCloudRulesElement = function SoundCloudRulesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
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

    return SoundCloudRulesElement.extend('SoundCloudRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
