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
    };

    return Model.extend({
        destroyWidget: function destroyWidget(widget) {
            var scope = this.scope;

            if (!this.base.isDefined(widget)) {
                scope.logger.warn('Undefined widget', widget);
                return false;
            }

            var widgets = scope.widgets,
                index = widget.model.getUUID();

            if (widgets.hasOwnProperty(index)) {
                delete widgets[index];
            }

            this.scope.widget = this.base.lib.hash.firstHashElement(widgets);

            return widgets;

        },
        destroyWidgets: function destroyWidget(force) {
            var index,
                widgets = this.scope.widgets;
            for (index in widgets) {
                if (widgets.hasOwnProperty(index)) {
                    this.destroy(widgets[index])
                }
            }
            return widgets;
        }

    }, BaseModel.prototype, Base);
});