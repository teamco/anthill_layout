/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model',
    'modules/base',
    'config/widget'
], function definePageModel(BaseModel, Base, Widget) {
    var Model = function Model() {
        this.item = Widget;
        this.onDestroy = [
            'Layout',
            'Template'
        ];
    };

    return Model.extend({
        /**
         * Get all widgets from collector
         * @returns {*}
         */
        getAllWidgets: function getAllWidgets() {
            return this.scope.items;
        },
        /**
         * Get widget from collector by UUID
         * @param {string} uuid
         * @returns {*}
         */
        getWidgetByUUID: function getWidgetByUUID(uuid) {
            var base = this.base,
                widgets = this.getAllWidgets(),
                widget = base.lib.hash.isHashKey(widgets, uuid) ?
                    widgets[uuid] : undefined;

            if (!base.isDefined(widget)) {
                this.scope.logger.warn('Undefined widget');
                widget = {};
            }
            return widget;
        },
        /**
         * Reset collector
         * @returns {*}
         */
        resetItems: function resetItems() {
            this.scope.items = {};
            return this.getAllWidgets();
        },
        /**
         * Delete widget from collector
         * @param uuid
         * @returns {*}
         */
        deleteWidget: function deleteWidget(uuid) {
            delete this.scope.items[uuid];
            return this.getAllWidgets();
        },
        /**
         * Update collector
         * @param {string} uuid
         * @param hash
         * returns {*}
         */
        updateItem: function updateItem(uuid, hash) {
            var widget = this.getWidgetByUUID(uuid);
            $.extend(true, widget, hash);
            return widget;
        },
        /**
         * Add widget to collector
         * @param opts
         * @param {boolean} force
         * @returns {*}
         */
        setWidget: function setWidget(opts, force) {
            var base = this.base;

            opts = base.define(opts, {}, true);
            force = base.defineBoolean(force, false, true);

            var widget = base.isDefined(this.getWidgetByUUID(opts.uuid));
            if (force || !widget) {
                this.scope.items[opts.uuid] = opts;
            } else if (widget) {
                this.scope.logger.warn('Widget already in collector');
            }
            return this.getWidgetByUUID(opts.uuid);
        }

    }, BaseModel.prototype, Base);
});