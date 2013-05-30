/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */

define([], function defineDebuggerActions() {

    /**
     * Define generic Actions
     * @class Actions
     * @constructor
     */
    var Actions = function Actions() {

    };

    return Actions.extend({

        /**
         * Init Actions
         */
        init: function init() {
            this.configScope();
        },

        /**
         * Config predefined scope
         */
        configScope: function configScope() {

            /**
             * Define edit mode
             * @type {Boolean}
             */
            this.editMode = false;

            this.actions = [
                'add-item',
                'remove-items',
                'remove-all-items',
                'locate-item'
            ];

            this.extendSelectors({
                edit: 'li.edit-mode',
                actions: 'ul.actions',
                items: 'ul.items-info',
                count: 'li.items-count'
            });

        },

        /**
         * Extend debugger selectors
         * @param {*} opts
         */
        extendSelectors: function extendSelectors(opts) {
            this.selectors = {};
            $.each(opts || {}, function each(i, selector) {
                this.selectors[i] = [
                    this.debugger.info,
                    [
                        'fieldset.',
                        this.scope.model.item.name.toLowerCase(),
                        's-info'
                    ].join(''),
                    selector
                ].join(' ');
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

        /**
         * Render generic action
         * @returns {string}
         * @private
         */
        _renderActions: function _renderActions() {
            var html = [];
            $.each(this.actions, function each(i, action) {
                var fn = this['_' + action.toCamel() + 'Button'];
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
        _addItemButton: function _addItemButton() {
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
        _removeItemsButton: function _removeItemsButton() {
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
        _removeAllItemsButton: function _removeAllItemsButton() {
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
        _locateItemButton: function _locateItemButton() {
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
         * Render items info
         * @param {*} scope
         * @returns {string}
         */
        renderItemsInfo: function renderItemsInfo(scope) {
            return [
                '<li class="extend">',
                this.debugger.component.renderBlock(scope.model.item.name + 's', [
                    this.renderItemsActions(),
                    this._getItemsCount(scope),
                    this.renderItemsList(scope)
                ], true),
                '</li>'
            ].join(' ');
        },

        /**
         * Render page items list
         * @param scope
         * @returns {string}
         */
        renderItemsList: function renderItemsList(scope) {
            var html = ['<li class="extend"><ul class="items-info">'];
            html.push(this.getItemsList(scope));
            html.push('</ul></li>');
            return html.join('');
        },

        /**
         * Get page item list
         * @param scope
         * @returns {string}
         */
        getItemsList: function getItemsList(scope) {
            var html = [];
            $.each(scope.items, function each(uuid, item) {
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
                this.getItemsList(page)
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
         * Bind enable page item edit mode
         * @param {*} scope
         */
        bindEnableItemsEditMode: function bindEnableItemsEditMode(scope) {
            $(this.selectors.edit).on('click.edit', function enableItemsEditMode(e) {
                this._enableItemsEditMode(e, scope);
            }.bind(this));
        },

        /**
         * Bind item list
         * @param scope
         * @private
         */
        _bindItemsList: function _bindItemsList(scope) {
            this.$select = this.debugger.base.define(
                this.$select,
                $('.select', this.selectors.actions)
            );

            if (this.editMode) {
                $('li', this.selectors.items).on('click.select', function select(e) {
                    var $li = $(e.target),
                        item = scope.items[$li.text()];

                    if ($li.hasClass('select')) {
                        scope.logger.debug('Unselect', item);
                        $li.removeClass('select');
                        this.$select.addClass('select');
                    } else {
                        scope.logger.debug('Select', item);
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
         * Enable item edit mode
         * @param {*} e
         * @param {*} scope
         * @private
         */
        _enableItemsEditMode: function _enableItemsEditMode(e, scope) {
            var $this = $(e.target),
                $disabled = $('li[rel="disabled"]', $this.parent('ul'));
            if ($disabled.hasClass('disabled')) {
                scope.logger.debug('Activate edit mode');
                $disabled.removeClass('disabled');
                $this.addClass('active');
                this.editMode = true;
                this._bindItemsList(scope);
                this._bindAddNewItem(scope);
                this._bindRemoveItems(scope);
                this._bindRemoveAllItems(scope);
                this._bindLocateItem(scope);
            } else {
                this._disableItemsEditMode($this, scope);
            }
        },

        /**
         * Disable page item edit mode
         * @param {*} $this
         * @param {*} scope
         * @private
         */
        _disableItemsEditMode: function _disableItemsEditMode($this, scope) {
            var $disabled = $('li[rel="disabled"]', $this.parent('ul'));

            scope.logger.debug('Deactivate edit mode');
            $disabled.addClass('disabled');
            $this.removeClass('active');
            this._unbindAddNewItem(scope);
            this._unbindRemoveItems(scope);
            this._unbindRemoveAllItems(scope);
            this._unbindLocateItem(scope);
            this._unbindItemsList();
            this.editMode = false;
        },

        /**
         * Bind add new item
         * @param {*} scope
         * @private
         */
        _bindAddNewItem: function _bindAddNewItem(scope) {
            scope.logger.debug('Bind edit mode');
            this._getItemAction('add-item').on(
                'click.add',
                /**
                 * Add new item
                 */
                function addNewItem(e) {
                    scope.api.createItem([], true);
                    this._getItemAction('remove-items').removeClass('disabled');
                }.bind(this)
            );
        },

        /**
         * Unbind add new item
         * @param {*} scope
         * @private
         */
        _unbindAddNewItem: function _unbindAddNewItem(scope) {
            scope.logger.debug('Unbind Add item');
            this._getItemAction('add-item').unbind('click.add');
        },

        /**
         * Bind remove items
         * @param scope
         * @private
         */
        _bindRemoveItems: function _bindRemoveItems(scope) {
            scope.logger.debug('Bind remove items');
            this._getItemAction('remove-items').on(
                'click.remove',
                /**
                 * Remove items
                 */
                function removeItems(e) {
                    if ($('li.select', this.selectors.items).length === 0) {
                        scope.logger.warn('Select items before remove');
                        return false;
                    }
                    this._removeItems(scope);
                }.bind(this)
            );
        },

        /**
         * Unbind remove items
         * @param {*} scope
         * @private
         */
        _unbindRemoveItems: function _unbindRemoveItems(scope) {
            scope.logger.debug('Unbind remove items');
            this._getItemAction('remove-items').unbind('click.remove');
            $('li', this.selectors.items).removeClass('select');
        },

        /**
         * Bind remove all items
         * @param scope
         * @private
         */
        _bindRemoveAllItems: function _bindRemoveAllItems(scope) {
            var $lis = $('li', this.selectors.items),
                $action = this._getItemAction('remove-all-items');
            scope.logger.debug('Bind remove all items');

            if ($lis.length === 0) {
                $action.addClass('disabled');
            }

            $action.on(
                'click.remove',
                /**
                 * Remove all items
                 */
                function removeAllItems(e) {
                    if ($lis.length === 0) {
                        scope.logger.warn('Add items before remove');
                        return false;
                    }
                    this._removeAllItems(scope);
                }.bind(this)
            );
        },

        /**
         * Unbind remove all items
         * @param {*} scope
         * @private
         */
        _unbindRemoveAllItems: function _unbindRemoveAllItems(scope) {
            scope.logger.debug('Unbind remove all items');
            this._getItemAction('remove-items').unbind('click.remove');
            $('li', this.selectors.items).removeClass('select');
        },

        /**
         * Bind locate item
         * @param scope
         * @private
         */
        _bindLocateItem: function _bindLocateItem(scope) {
            scope.logger.debug('Bind locate item');

            this._getItemAction('locate-item').on('click.locate', function locate(e) {
                this._locateItem(scope);
            }.bind(this));
        },

        /**
         * Unbind remove all items
         * @param {*} scope
         * @private
         */
        _unbindLocateItem: function _unbindLocateItem(scope) {
            scope.logger.debug('Unbind locate item');
            this._getItemAction('locate-item').unbind('click.locate');
//            $('li', this.selectors.items).removeClass('select');
        },

        _locateItem: function _locateItem(scope) {
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
         * @param {*} scope
         * @private
         */
        _removeItems: function _removeItems(scope) {
            var items = {};
            $.each($('li.select', this.selectors.items), function each(i, v) {
                var uuid = $(v).text();
                items[uuid] = scope.model.getItemByUUID(uuid);
            });

            scope.logger.debug('Start remove items', items);
            scope.api.destroyItems(items);

        },

        /**
         * Remove items
         * @param {*} scope
         * @private
         */
        _removeAllItems: function _removeAllItems(scope) {
            $('li', this.selectors.items).addClass('select');
            this._getItemAction('remove-all-items').addClass('disabled');
            scope.logger.debug('Start remove all items');
            this._removeItems(scope);
        }
    });
});
