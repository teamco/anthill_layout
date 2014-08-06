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

            this._config(view, opts, $('<li />')).build({
                $container: opts.$container,
                destroy: false
            });

            /**
             * Define title
             * @type {string}
             */
            this.title = 'Create new page';

            /**
             * Define description
             * @type {string}
             */
            this.description = 'Clicking a button will take you to the edit page for the new widgets';

            return this.init();
        };

        return WorkspaceDataAddPageElement.extend('WorkspaceDataAddPageElement', {

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
                    $container: this
                });

                return this;
            }

        }, BaseElement.prototype);
    }
);