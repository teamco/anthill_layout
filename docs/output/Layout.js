Ext.data.JsonP.Layout({"tagname":"class","name":"Layout","autodetected":{},"files":[{"filename":"layout.js","href":"layout.html#Layout"}],"extends":"AntHill","members":[{"name":"","tagname":"property","owner":"Layout","id":"property-","meta":{}},{"name":"CONSTANTS","tagname":"property","owner":"Layout","id":"property-CONSTANTS","meta":{}},{"name":"DEFAULTS","tagname":"property","owner":"Layout","id":"property-DEFAULTS","meta":{}},{"name":"api","tagname":"property","owner":"AntHill","id":"property-api","meta":{}},{"name":"base","tagname":"property","owner":"AntHill","id":"property-base","meta":{}},{"name":"config","tagname":"property","owner":"AntHill","id":"property-config","meta":{}},{"name":"containment","tagname":"property","owner":"Layout","id":"property-containment","meta":{}},{"name":"controller","tagname":"property","owner":"AntHill","id":"property-controller","meta":{}},{"name":"emptyColumns","tagname":"property","owner":"Layout","id":"property-emptyColumns","meta":{}},{"name":"emptyRows","tagname":"property","owner":"Layout","id":"property-emptyRows","meta":{}},{"name":"eventmanager","tagname":"property","owner":"AntHill","id":"property-eventmanager","meta":{}},{"name":"i18n","tagname":"property","owner":"AntHill","id":"property-i18n","meta":{}},{"name":"model","tagname":"property","owner":"AntHill","id":"property-model","meta":{}},{"name":"mvc","tagname":"property","owner":"Layout","id":"property-mvc","meta":{}},{"name":"observer","tagname":"property","owner":"AntHill","id":"property-observer","meta":{}},{"name":"overlapping","tagname":"property","owner":"Layout","id":"property-overlapping","meta":{}},{"name":"permission","tagname":"property","owner":"AntHill","id":"property-permission","meta":{}},{"name":"view","tagname":"property","owner":"AntHill","id":"property-view","meta":{}},{"name":"constructor","tagname":"method","owner":"AntHill","id":"method-constructor","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Layout","component":false,"superclasses":["AntHill"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/AntHill' rel='AntHill' class='docClass'>AntHill</a><div class='subclass '><strong>Layout</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/layout.html#Layout' target='_blank'>layout.js</a></div></pre><div class='doc-contents'><p>Define Layout</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Layout'>Layout</span><br/><a href='source/listeners.html#Layout-property-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Layout-property-' class='name expandable'></a> : {\n     afterNestedOrganizer: {name: <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a>, callback: Function}\n}<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define Layout Local listeners</p>\n</div><div class='long'><p>Define Layout Local listeners</p>\n</div></div></div><div id='property-CONSTANTS' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Layout'>Layout</span><br/><a href='source/layout.html#Layout-property-CONSTANTS' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Layout-property-CONSTANTS' class='name expandable'>CONSTANTS</a> : {organize: *[], emptySpaces: *[]}<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define constants</p>\n</div><div class='long'><p>Define constants</p>\n</div></div></div><div id='property-DEFAULTS' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Layout'>Layout</span><br/><a href='source/layout.html#Layout-property-DEFAULTS' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Layout-property-DEFAULTS' class='name expandable'>DEFAULTS</a> : {\n     type: string,\n     limit: boolean,\n     containment: Page|Widget,\n     grid: {\n         columns: number,\n         additionalRows: number,\n         margin: number,\n         padding: {\n             top: number,\n             right: number,\n             bottom: number,\n             left: number\n         }\n     }\n}<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define default config</p>\n</div><div class='long'><p>Define default config</p>\n</div></div></div><div id='property-api' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-api' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-api' class='name expandable'>api</a> : <a href=\"#!/api/BaseAPI\" rel=\"BaseAPI\" class=\"docClass\">BaseAPI</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init API</p>\n</div><div class='long'><p>Init API</p>\n</div></div></div><div id='property-base' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-base' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-base' class='name expandable'>base</a> : <a href=\"#!/api/Base\" rel=\"Base\" class=\"docClass\">Base</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define base</p>\n</div><div class='long'><p>Define base</p>\n</div></div></div><div id='property-config' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-config' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-config' class='name expandable'>config</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Init config ...</div><div class='long'><p>Init config</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-containment' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Layout'>Layout</span><br/><a href='source/layout.html#Layout-property-containment' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Layout-property-containment' class='name expandable'>containment</a> : *<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define containment</p>\n</div><div class='long'><p>Define containment</p>\n</div></div></div><div id='property-controller' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-controller' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-controller' class='name expandable'>controller</a> : <a href=\"#!/api/BaseController\" rel=\"BaseController\" class=\"docClass\">BaseController</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init controller</p>\n</div><div class='long'><p>Init controller</p>\n</div></div></div><div id='property-emptyColumns' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Layout'>Layout</span><br/><a href='source/layout.html#Layout-property-emptyColumns' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Layout-property-emptyColumns' class='name expandable'>emptyColumns</a> : <a href=\"#!/api/EmptyColumns\" rel=\"EmptyColumns\" class=\"docClass\">EmptyColumns</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define empty columns</p>\n</div><div class='long'><p>Define empty columns</p>\n</div></div></div><div id='property-emptyRows' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Layout'>Layout</span><br/><a href='source/layout.html#Layout-property-emptyRows' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Layout-property-emptyRows' class='name expandable'>emptyRows</a> : <a href=\"#!/api/EmptyRows\" rel=\"EmptyRows\" class=\"docClass\">EmptyRows</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define empty rows</p>\n</div><div class='long'><p>Define empty rows</p>\n</div></div></div><div id='property-eventmanager' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-eventmanager' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-eventmanager' class='name expandable'>eventmanager</a> : *<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init event manager</p>\n</div><div class='long'><p>Init event manager</p>\n</div></div></div><div id='property-i18n' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-i18n' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-i18n' class='name expandable'>i18n</a> : <a href=\"#!/api/i18n\" rel=\"i18n\" class=\"docClass\">i18n</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define translations</p>\n</div><div class='long'><p>Define translations</p>\n</div></div></div><div id='property-model' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-model' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-model' class='name expandable'>model</a> : <a href=\"#!/api/BaseModel\" rel=\"BaseModel\" class=\"docClass\">BaseModel</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init model</p>\n</div><div class='long'><p>Init model</p>\n</div></div></div><div id='property-mvc' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Layout'>Layout</span><br/><a href='source/layout.html#Layout-property-mvc' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Layout-property-mvc' class='name expandable'>mvc</a> : <a href=\"#!/api/MVC\" rel=\"MVC\" class=\"docClass\">MVC</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define MVC</p>\n</div><div class='long'><p>Define MVC</p>\n</div></div></div><div id='property-observer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-observer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-observer' class='name expandable'>observer</a> : <a href=\"#!/api/Observer\" rel=\"Observer\" class=\"docClass\">Observer</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init observer</p>\n</div><div class='long'><p>Init observer</p>\n</div></div></div><div id='property-overlapping' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Layout'>Layout</span><br/><a href='source/layout.html#Layout-property-overlapping' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Layout-property-overlapping' class='name expandable'>overlapping</a> : <a href=\"#!/api/Overlapping\" rel=\"Overlapping\" class=\"docClass\">Overlapping</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define overlapping</p>\n</div><div class='long'><p>Define overlapping</p>\n</div></div></div><div id='property-permission' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-permission' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-permission' class='name expandable'>permission</a> : <a href=\"#!/api/BasePermission\" rel=\"BasePermission\" class=\"docClass\">BasePermission</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define permissions</p>\n</div><div class='long'><p>Define permissions</p>\n</div></div></div><div id='property-view' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-property-view' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AntHill-property-view' class='name expandable'>view</a> : <a href=\"#!/api/BaseView\" rel=\"BaseView\" class=\"docClass\">BaseView</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Init view</p>\n</div><div class='long'><p>Init view</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AntHill' rel='AntHill' class='defined-in docClass'>AntHill</a><br/><a href='source/anthill.html#AntHill-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/AntHill-method-constructor' class='name expandable'>Layout</a>( <span class='pre'></span> ) : <a href=\"#!/api/AntHill\" rel=\"AntHill\" class=\"docClass\">AntHill</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/AntHill\" rel=\"AntHill\" class=\"docClass\">AntHill</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});