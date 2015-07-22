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
], function defineSyntaxHighlighterModel(BaseModel, WidgetContentModel) {

    /**
     * Define SyntaxHighlighter model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SyntaxHighlighterModel
     * @constructor
     */
    var SyntaxHighlighterModel = function SyntaxHighlighterModel() {

        /**
         * Define preferences
         * @property SyntaxHighlighterModel
         * @type {{
         *      syntaxhighlighterCode: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      syntaxhighlighterType: {type: string, disabled: boolean, list: Array, value: string, visible: boolean}
         * }}
         */
        this.preferences = {
            syntaxhighlighterCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            syntaxhighlighterType: {
                type: 'combobox',
                disabled: false,
                list: [],
                value: 'JavaScript',
                visible: true
            }
        };

        /**
         * Define defaults
         * @property SyntaxHighlighterModel
         * @type {{names: string[], aliases: string[], files: string[]}}
         */
        this.syntaxHighlighterData = {
            name: ['ActionScript3', 'Bash/shell', 'ColdFusion', 'C#', 'C++', 'CSS', 'Delphi', 'Diff', 'Erlang', 'Groovy', 'JavaScript', 'Java', 'JavaFX', 'Perl', 'PHP', 'Plain Text', 'PowerShell', 'Python', 'Ruby', 'Scala', 'SQL', 'Visual Basic', 'XML'],
            alias: ['as3, actionscript3', 'bash, shell', 'cf, coldfusion', 'c-sharp, csharp', 'cpp, c', 'css', 'delphi, pas, pascal', 'diff, patch', 'erl, erlang', 'groovy', 'js, jscript, javascript', 'java', 'jfx, javafx', 'perl, pl', 'php', 'plain, text', 'ps, powershell', 'py, python', 'rails, ror, ruby', 'scala', 'sql', 'vb, vbnet', 'xml, xhtml, xslt, html, xhtml'],
            file: ['shBrushAS3.js', 'shBrushBash.js', 'shBrushColdFusion.js', 'shBrushCSharp.js', 'shBrushCpp.js', 'shBrushCss.js', 'shBrushDelphi.js', 'shBrushDiff.js', 'shBrushErlang.js', 'shBrushGroovy.js', 'shBrushJScript.js', 'shBrushJava.js', 'shBrushJavaFX.js', 'shBrushPerl.js', 'shBrushPhp.js', 'shBrushPlain.js', 'shBrushPowerShell.js', 'shBrushPython.js', 'shBrushRuby.js', 'shBrushScala.js', 'shBrushSql.js', 'shBrushVb.js', 'shBrushXml.js']
        };

        for (var i = 0; i < this.syntaxHighlighterData.name.length; i++) {

            this.preferences.syntaxhighlighterType.list.push(
                {type: 'text', value: this.syntaxHighlighterData.name[i]}
            );
        }

        /**
         * Define rules
         * @property SyntaxHighlighterModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SyntaxHighlighterModel.extend('SyntaxHighlighterModel', {

        /**
         * Define getter entity by name
         * @memberOf SyntaxHighlighterModel
         * @param {string} type
         * @param {string} name
         * @returns {*}
         */
        getEntityByName: function getEntityByName(type, name) {

            var index = this.syntaxHighlighterData.name.indexOf(name);

            if (index === -1) {
                this.scope.logger.warn('Unable to define entity', type, name);
                return false;
            }

            return this.syntaxHighlighterData[type][index];
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
