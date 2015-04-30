/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function definePageTabsModel(BaseModel, WidgetContentModel) {

    /**
     * Define PageTabs model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PageTabsModel
     * @constructor
     */
    var PageTabsModel = function PageTabsModel() {

        /**
         /**
         * Define preferences
         * @memberOf PageTabsModel
         * @type {{
         *      pagetabsSwipe: {type: string, disabled: boolean, value: boolean, visible: boolean}
         * }}
         */
        this.preferences = {
            pagetabsSwipe: {
                type: 'checkbox',
                disabled: false,
                value: true,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf PageTabsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PageTabsModel.extend('PageTabsModel', {

        /**
         * Set PageTabs swipe
         * @param {boolean} swipe
         */
        setPagetabsSwipe: function setPagetabsSwipe(swipe) {
            this.setPrefs('pagetabsSwipe', swipe);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});