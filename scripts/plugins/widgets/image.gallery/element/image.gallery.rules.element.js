/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/rules/widget.base.rules'
], function defineImageGalleryRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define ImageGallery Rules Element
     * @param view
     * @param opts
     * @returns {ImageGalleryRulesElement}
     * @constructor
     * @class ImageGalleryRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ImageGalleryRulesElement = function ImageGalleryRulesElement(view, opts) {

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

    return ImageGalleryRulesElement.extend('ImageGalleryRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});