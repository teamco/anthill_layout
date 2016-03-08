/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define(
    ['modules/Element'],

    /**
     * Define WorkspaceDataAddPageElement
     * @param {BaseElement} BaseElement
     * @returns {*}
     */
    function defineWorkspaceDataAddPageElement(BaseElement) {

        /**
         * Define WorkspaceData AddPage Element
         * @constructor
         * @class WorkspaceDataAddPageElement
         * @extends BaseElement
         * @param {WorkspaceDataView} view
         * @param opts
         * @returns {WorkspaceDataAddPageElement}
         */
        var WorkspaceDataAddPageElement = function WorkspaceDataAddPageElement(view, opts) {

            this._config(view, opts, $('<li class="content" />')).build({
                $container: opts.$container,
                destroy: false
            });

            /**
             * Define title
             * @memberOf WorkspaceDataAddPageElement
             * @type {string}
             */
            this.title = 'Create new page';

            /**
             * Define description
             * @memberOf WorkspaceDataAddPageElement
             * @type {string}
             */
            this.description = 'Clicking a button will take you to the edit page for the new widgets';

            return this.init();
        };

        return WorkspaceDataAddPageElement.extend(
            'WorkspaceDataAddPageElement', {

                /**
                 * Define inner content
                 * @memberOf WorkspaceDataContentElement
                 */
                getTemplate: function getTemplate() {
                    $('<a class="page add" href="#" />').
                        appendTo(this.$);
                },

                /**
                 * Define Init
                 * @memberOf WorkspaceDataAddPageElement
                 * @returns {WorkspaceDataAddPageElement}
                 */
                init: function init() {

                    this.setTitle(this.title);
                    this.renderTooltip({
                        title: this.title,
                        description: this.description,
                        selector: this.$
                    });

                    this.getTemplate();

                    return this;
                },

                /**
                 * Render add wizard
                 * @memberOf WorkspaceDataAddPageElement
                 * @param {Workspace} workspace
                 * @returns {*|jQuery|HTMLElement}
                 */
                renderWizard: function renderWizard(workspace) {

                    var $ul = $('<ul />');

                    var items = workspace.model.getItems();

                    /**
                     * Define clone pages
                     * @type {Array}
                     */
                    var clonePages = $.map(items, function map(page) {

                        var uuid = page.model.getUUID(),
                            title = page.model.getItemTitle(),
                            counter = page.model.getConfig('widget/counter'),
                            description = (uuid === title ? '' : title) + '<br />',
                            pluralize = 'items: ' + counter;

                        return {
                            type: 'text',
                            value: uuid,
                            tooltip: description + pluralize
                        };
                    });

                    clonePages.unshift({
                        type: 'text',
                        value: 'Empty page'
                    });

                    /**
                     * Define title
                     * @type {*|jQuery}
                     */
                    var $title = $('<li />').append(
                        this.renderTextField({
                            name: 'title',
                            text: 'Page title',
                            placeholder: 'Enter title',
                            disabled: false,
                            visible: true
                        })
                    ).addClass('page-title');

                    /**
                     * Define clone from
                     * @type {*|jQuery}
                     */
                    var $clone = $('<li />').append(
                        this.renderCombobox(
                            clonePages,
                            clonePages[0].value,
                            'Create as',
                            'cloneItemContent',
                            undefined,
                            true
                        )
                    );

                    return $ul.append([
                        $clone,
                        $title
                    ]);
                }

            },
            BaseElement.prototype
        );
    }
);