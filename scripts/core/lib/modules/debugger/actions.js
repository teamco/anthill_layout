/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */

define([], function defineDebuggerActions() {

    /**
     * Define Debugger Workspace
     * @constructor
     */
    var Actions = function Actions() {

    };

    return Actions.extend({

        /**
         * Extend debugger selectors
         * @param {*} opts
         */
        extendSelectors: function extendSelectors(opts) {
            this.selectors = {};
            $.each(opts || {}, function each(i, selector) {
                this.selectors[i] = [this.debugger.info, selector].join(' ');
            }.bind(this));

        },

        /**
         * Render page items actions
         * @returns {string}
         */
        renderItemsActions: function renderItemsActions() {
            return [
                '<li class="extend"><ul class="actions">',
                this._renderActions(),
                this._renderEnableEditMode(),
                '</ul></li>'
            ].join('');
        },

        _renderActions: function _renderActions() {
            var html = [];
            $.each(this.actions, function each(i, action) {
                var fn = this['_' + action.toCamel()];
                console.log(fn)
                if (this.debugger.base.isFunction(fn)) {
                    html.push(fn.bind(this)());
                }
            }.bind(this));
            return html.join('');
        },

        /**
         * Render add new item button
         * @returns {string}
         * @private
         */
        _addItem: function _addItem() {
            return this.debugger.component.renderInlineAction({
                rel: 'disabled',
                style: 'disabled',
                title: 'Add item'
            });
        },

        /**
         * Render remove item button
         * @returns {string}
         * @private
         */
        _removeItem: function _renderRemoveItem() {
            return this.debugger.component.renderInlineAction({
                rel: 'disabled',
                style: 'disabled select',
                title: 'Remove items'
            });
        },

        /**
         * Render remove items button
         * @returns {string}
         * @private
         */
        _renderRemoveItems: function _renderRemoveItems() {
            return this.debugger.component.renderInlineAction({
                rel: 'disabled',
                style: 'disabled select',
                title: 'Remove all items'
            });
        },

        /**
         * Render locate item button
         * @returns {string}
         * @private
         */
        _renderLocateItem: function _renderLocateItem() {
            return this.debugger.component.renderInlineAction({
                rel: 'disabled',
                style: 'disabled select',
                title: 'Locate item'
            });
        },

        /**
         * Render enable edit mode
         * @returns {string}
         * @private
         */
        _renderEnableEditMode: function _renderEnableEditMode() {
            return this.debugger.component.renderInlineAction({
                rel: 'disabled',
                title: 'Edit mode'
            });
        },

        /**
         * Render page items info
         * @param {*} page
         * @returns {string}
         */
        renderPageItems: function renderPageItems(page) {
            return [
                '<li class="extend">',
                this.debugger.component.renderBlock('Items', [
                    this.renderPageItemsActions(),
                    this._getItemsCount(page),
                    this.renderPageItemsList(page)
                ], true),
                '</li>'
            ].join(' ');
        },

        /**
         * Render page items list
         * @param page
         * @returns {string}
         */
        renderPageItemsList: function renderPageItemsList(page) {
            var html = ['<li class="extend"><ul class="items-info">'];
            html.push(this.getPageItemsList(page));
            html.push('</ul></li>');
            return html.join('');
        },

        /**
         * Get page item list
         * @param page
         * @returns {string}
         */
        getPageItemsList: function getPageItemsList(page) {
            var html = [];
            $.each(page.items, function each(uuid, item) {
                html.push([
                    '<li class="', item.model.getConfig('type'), '">', uuid , '</li>'
                ].join(''));
            });

            return html.join('');
        },

        /**
         * Update page item list
         * @param page
         */
        updateItems: function updateItems(page) {
            $(this.selectors.items).html(
                this.getPageItemsList(page)
            );

            var $count = $(this.selectors.count);

            $count.before(
                this._getItemsCount(page)
            ).remove();

            this._bindItemsList(page);
            this.$select.addClass('select');
        },

        /**
         * Get items count
         * @param {*} page
         * @returns {string}
         * @private
         */
        _getItemsCount: function _getItemsCount(page) {
            return this.debugger.component.renderInlineOf('Count', page);
        },

        /**
         * Get page item action button
         * @param {String} action
         * @returns {*|jQuery|HTMLElement}
         * @private
         */
        _getItemAction: function _getItemAction(action) {
            return $('li.' + action, this.selectors.actions);
        },

        /**
         * Bind enable page item edit mode,
         * @param {*} page
         */
        bindEnablePageItemsEditMode: function bindEnablePageItemsEditMode(page) {
            $(this.selectors.edit).on('click.edit', function edit(e) {
                this._enablePageItemsEditMode(e, page);
            }.bind(this));
        },

        /**
         * Bind item list
         * @param page
         * @private
         */
        _bindItemsList: function _bindItemsList(page) {
            this.$select = this.debugger.base.define(
                this.$select,
                $('.select', this.selectors.actions)
            );

            if (this.editMode) {
                $('li', this.selectors.items).on('click.select', function select(e) {
                    var $li = $(e.target),
                        item = page.items[$li.text()];

                    if ($li.hasClass('select')) {
                        page.logger.debug('Unselect', item);
                        $li.removeClass('select');
                        this.$select.addClass('select');
                    } else {
                        page.logger.debug('Select', item);
                        $li.addClass('select');
                        this.$select.removeClass('select');
                    }

                    var $select = $('li.select', this.selectors.items),
                        $locate = this._getItemAction('locate-item');

                    $select.length === 1 ?
                        $locate.removeClass('disabled select') :
                        $locate.addClass('disabled select');

                }.bind(this));
            }
        },

        /**
         * Unbind item list
         * @private
         */
        _unbindItemsList: function _unbindItemsList() {
            $('li', this.selectors.items).unbind('click.select');
        },

        /**
         * Enable page item edit mode
         * @param {*} e
         * @param {*} page
         * @private
         */
        _enablePageItemsEditMode: function _enablePageItemsEditMode(e, page) {
            var $this = $(e.target),
                $disabled = $('li[rel="disabled"]', $this.parent('ul'));
            if ($disabled.hasClass('disabled')) {
                page.logger.debug('Activate edit mode');
                $disabled.removeClass('disabled');
                $this.addClass('active');
                this.editMode = true;
                this._bindItemsList(page);
                this._bindAddNewItem(page);
                this._bindRemoveItem(page);
                this._bindRemoveAllItems(page);
                this._bindLocateItem(page);
            } else {
                this._disablePageItemsEditMode($this, page);
            }
        },

        /**
         * Disable page item edit mode
         * @param {*} $this
         * @param {*} page
         * @private
         */
        _disablePageItemsEditMode: function _disablePageItemsEditMode($this, page) {
            var $disabled = $('li[rel="disabled"]', $this.parent('ul'));

            page.logger.debug('Deactivate edit mode');
            $disabled.addClass('disabled');
            $this.removeClass('active');
            this._unbindAddNewItem(page);
            this._unbindRemoveItem(page);
            this._unbindRemoveAllItems(page);
            this._unbindLocateItem(page);
            this._unbindItemsList();
            this.editMode = false;
        },

        /**
         * Bind add new item
         * @param {*} page
         * @private
         */
        _bindAddNewItem: function _bindAddNewItem(page) {
            page.logger.debug('Bind edit mode');
            this._getItemAction('add-item').on('click.add', function (e) {
                page.api.createItem([], true);
                this._getItemAction('remove-items').removeClass('disabled');
            }.bind(this));
        },

        /**
         * Unbind add new item
         * @param {*} page
         * @private
         */
        _unbindAddNewItem: function _unbindAddNewItem(page) {
            page.logger.debug('Unbind Add item');
            this._getItemAction('add-item').unbind('click.add');
        },

        /**
         * Bind remove items
         * @param page
         * @private
         */
        _bindRemoveItem: function _bindRemoveItem(page) {
            page.logger.debug('Bind remove items');
            this._getItemAction('remove-item').on('click.remove', function remove(e) {
                if ($('li.select', this.selectors.items).length === 0) {
                    page.logger.warn('Select items before remove');
                    return false;
                }
                this._removeItems(page);
            }.bind(this));
        },

        /**
         * Unbind remove items
         * @param {*} page
         * @private
         */
        _unbindRemoveItem: function _unbindRemoveItem(page) {
            page.logger.debug('Unbind remove items');
            this._getItemAction('remove-item').unbind('click.remove');
            $('li', this.selectors.items).removeClass('select');
        },

        /**
         * Bind remove all items
         * @param page
         * @private
         */
        _bindRemoveAllItems: function _bindRemoveAllItems(page) {
            var $lis = $('li', this.selectors.items),
                $action = this._getItemAction('remove-items');
            page.logger.debug('Bind remove all items');

            if ($lis.length === 0) {
                $action.addClass('disabled');
            }

            $action.on('click.remove', function remove(e) {
                if ($lis.length === 0) {
                    page.logger.warn('Add items before remove');
                    return false;
                }
                this._removeAllItems(page);
            }.bind(this));
        },

        /**
         * Unbind remove all items
         * @param {*} page
         * @private
         */
        _unbindRemoveAllItems: function _unbindRemoveAllItems(page) {
            page.logger.debug('Unbind remove all items');
            this._getItemAction('remove-items').unbind('click.remove');
            $('li', this.selectors.items).removeClass('select');
        },

        /**
         * Bind locate item
         * @param page
         * @private
         */
        _bindLocateItem: function _bindLocateItem(page) {
            page.logger.debug('Bind locate item');

            this._getItemAction('locate-item').on('click.locate', function locate(e) {
                this._locateItem(page);
            }.bind(this));
        },

        /**
         * Unbind remove all items
         * @param {*} page
         * @private
         */
        _unbindLocateItem: function _unbindLocateItem(page) {
            page.logger.debug('Unbind locate item');
            this._getItemAction('locate-item').unbind('click.locate');
//            $('li', this.selectors.items).removeClass('select');
        },

        _locateItem: function _locateItem(page) {
//            var $li = $('li.select', this.selectors.items);
//
//            if ($li.length !== 1) {
//                page.logger.warn('Select one item before locate');
//                return false;
//            }
//
//            var uuid = $li.text(),
//                item = page.model.getItemByUUID(uuid);
//
//            if (!this.debugger.base.isDefined(item)) {
//                page.logger.warn('Undefined item', uuid);
//                return false;
//            }
//
//            page.logger.warn('Locate', item);

        },

        /**
         * Remove items
         * @param {*} page
         * @private
         */
        _removeItems: function _removeItems(page) {
            var items = {};
//            $.each($('li.select', this.selectors.items), function each(i, v) {
//                var uuid = $(v).text();
//                items[uuid] = page.model.getItemByUUID(uuid);
//            });
//
//            page.logger.debug('Start remove items', items);
//            page.api.destroyItems(items);

        },

        /**
         * Remove items
         * @param {*} page
         * @private
         */
        _removeAllItems: function _removeAllItems(page) {
//            $('li', this.selectors.items).addClass('select');
//            this._getItemAction('remove-items').addClass('disabled');
//            page.logger.debug('Start remove all items');
//            this._removeItems(page);
        }
    });
});
