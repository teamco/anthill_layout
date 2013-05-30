/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:34 PM
 */

define([
    'modules/base',
    'modules/debugger/config',
    'modules/debugger/component',
    'modules/debugger/tabs',
    'modules/debugger/grid',
    'modules/debugger/application',
    'modules/debugger/workspace',
    'modules/debugger/page',
    'modules/debugger/layout',
    'modules/debugger/widget'
], function defineDebugger(Base, Config, Component, Tabs, Grid, App, Workspace, Page, Layout, Widget) {

    /**
     * Define Debugger
     * @param scope
     * @class Debugger
     * @constructor
     */
    var Debugger = function Debugger(scope) {

        this.scope = scope;

        this.placeholders = '#placeholders';
        this.info = '#debug-mode';

        this.links = [
            'Logger',
            'Application',
            'Workspace',
            'Page',
            'Template',
            'Widget'
        ];

        this.showTab = 5;
        this.pinTabs = true;

        this.opacityOff = 0.8;

        this.rows = 25;
        this.scopes = {};

        this.init();

    };

    return Debugger.extend({

        /**
         * Init debugger components
         */
        init: function init() {

            /**
             * Define config
             * @type {DebuggerConfig}
             */
            this.config = new Config(this);

            /**
             * Define component
             * @type {DebuggerComponent}
             */
            this.component = new Component(this);

            /**
             * Define tabs
             * @type {DebuggerTabs}
             */
            this.tabs = new Tabs(this, this.pinTabs, this.opacityOff);

            /**
             * Define app
             * @type {DebuggerApp}
             */
            this.app = new App(this, this.scope);

            /**
             * Define workspace
             * @type {DebuggerWorkspace}
             */
            this.workspace = new Workspace(this, this.scopes.workspace);

            /**
             * Define page
             * @type {DebuggerPage}
             */
            this.page = new Page(this, this.scopes.page);

            /**
             * Define layout
             * @type {DebuggerLayout}
             */
            this.layout = new Layout(this);

            /**
             * Define grid
             * @type {DebuggerGrid}
             */
            this.grid = new Grid(this);

            /**
             * Define widget
             * @type {DebuggerWidget}
             */
            this.widget = new Widget(this);

            this.renderDebugger();
        },


        /**
         * Destroy debugger
         */
        destroy: function destroy() {
            this.grid.destroyGrid();
            this.destroyDebuggerDOM();
            this.scope.debugger = undefined;
            delete this.scope.debugger;
        },

        /**
         * Destroy info window
         */
        destroyDebuggerDOM: function destroyDebuggerDOM() {
            $(this.info).stop().fadeOut('slow', function fadeOt() {
                $(this).unbind().remove();
            });
        },

        /**
         * Render Info window
         * @param {{type, timeStamp}} [event]
         * @param {{originalPosition, offset, position, helper}} [ui]
         */
        renderDebugger: function renderDebugger(event, ui) {

            var scope = this.scope,
                scopes = this.scopes,
                base = this.base,

                $div = $(this.info),
                opacityOff = this.opacityOff;

            if ($div.length === 0) {
                $div = $('<div />');
                $div.attr({
                    id: this.info.replace(/#/, '')
                }).css({
                        opacity: opacityOff
                    }).draggable({
                        handle: '.handler',
                        cancel: '.plus, .minus, .pin'
                    });
                $(scope.config.html.container).append($div);
            }

            var workspace = scopes.workspace,
                page = scopes.page,
                layout = page.layout,
                logger = scope.config.logger,
                c = this.component;

            event = base.define(event, {}, true);
            ui = base.define(ui, {}, true);

            $div.html(
                [
                    '<ul class="handler">',
                    c.renderInput('Show Grid', false),
                    c.renderInput('Expand the Content', false),
                    '</ul>',
                    '<div class="debug-container">',

                    c.renderBlock('Widget', [
                        this.widget.renderWidgetInfo(event, ui)
                    ], false),

                    c.renderBlock('Page', [
                        c.renderInline('UUID', page.config.uuid),
                        this.layout.renderPageLayout(layout),
                        this.page.renderItemsInfo(page)
                    ], false),

                    c.renderBlock('Workspace', [
                        c.renderInline('UUID', workspace.config.uuid),
                        this.workspace.renderItemsInfo(workspace)
                    ], false),

                    c.renderBlock('Application', [
                        c.renderInline('UUID', scope.config.uuid),
                        c.renderInline('Mode', scope.config.mode),
                        this.app.renderItemsInfo(scope)
                    ], false),

                    c.renderBlock('Logger', [
                        c.renderInline('Namespaces', logger.namespaces),
                        c.renderInput('Show', logger.show),
                        c.renderInput('console.debug', logger.type.debug),
                        c.renderInput('console.log', logger.type.log),
                        c.renderInput('console.info', logger.type.info),
                        c.renderInput('console.error', logger.type.error),
                        c.renderInput('console.warn', logger.type.warn)
                    ], false),

                    '</div><div class="debug-close">Hide</div>'

                ].join('')
            ).show();

            this.tabs.renderTabs($div, opacityOff);

            c.bindCollapse();
            c.bindShowHideAll();
            c.bindDebugClose();

            this.layout.bindToggleGrid();
            this.layout.bindChangeOverlappingMode();
            this.layout.bindAllowOverlapping();

            this.page.bindEnableItemsEditMode(page);
            this.workspace.bindEnableItemsEditMode(workspace);
            this.app.bindEnableItemsEditMode(this.scope);

            this.tabs.openTab({
                target: $div.find('li[title="' + this.links[this.showTab - 2] + '"]')
            });

        }

    }, Base);
});