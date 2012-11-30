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
    'config/page'
], function defineWorkspaceModel(BaseModel, Base, Page) {
    var Model = function Model() {

    };

    return Model.extend({
        createPage: function createPage(opts) {
            return this.updateCollector(
                Page,
                opts,
                this.scope.pages
            );
        },
        destroyPage: function destroyPage(page) {
            var scope = this.scope;

            if (!this.base.isDefined(page)) {
                scope.logger.warn('Undefined page', page);
                return false;
            }

            var pages = scope.pages,
                index = page.model.getUUID();

            page.observer.publish(
                page.eventmanager.eventList.destroyWidgets
            );

            page.observer.publish(
                page.eventmanager.eventList.destroyLayout
            );

            if (pages.hasOwnProperty(index)) {
                delete pages[index];
            }

            this.scope.page = this.base.lib.hash.firstHashElement(pages) || {};

            return pages;

        },
        destroyPages: function destroyPage(force) {
            var index,
                pages = this.scope.pages;
            for (index in pages) {
                if (pages.hasOwnProperty(index)) {
                    this.destroyPage(pages[index])
                }
            }
            return pages;
        }

    }, BaseModel.prototype, Base);
});