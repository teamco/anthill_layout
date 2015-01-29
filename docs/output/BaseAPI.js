Ext.data.JsonP.BaseAPI({"tagname":"class","name":"BaseAPI","autodetected":{},"files":[{"filename":"API.js","href":"API.html#BaseAPI"}],"members":[{"name":"scope","tagname":"property","owner":"BaseAPI","id":"property-scope","meta":{}},{"name":"silent","tagname":"property","owner":"BaseAPI","id":"property-silent","meta":{}},{"name":"BaseAPI","tagname":"method","owner":"BaseAPI","id":"method-BaseAPI","meta":{}},{"name":"_createItem","tagname":"method","owner":"BaseAPI","id":"method-_createItem","meta":{"protected":true}},{"name":"_executeReference","tagname":"method","owner":"BaseAPI","id":"method-_executeReference","meta":{"private":true}},{"name":"_renderItem","tagname":"method","owner":"BaseAPI","id":"method-_renderItem","meta":{"private":true}},{"name":"createItem","tagname":"method","owner":"BaseAPI","id":"method-createItem","meta":{}},{"name":"destroyItems","tagname":"method","owner":"BaseAPI","id":"method-destroyItems","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-BaseAPI","component":false,"superclasses":[],"subclasses":["AppAPI","PageAPI","WidgetAPI","WorkspaceAPI"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Subclasses</h4><div class='dependency'><a href='#!/api/AppAPI' rel='AppAPI' class='docClass'>AppAPI</a></div><div class='dependency'><a href='#!/api/PageAPI' rel='PageAPI' class='docClass'>PageAPI</a></div><div class='dependency'><a href='#!/api/WidgetAPI' rel='WidgetAPI' class='docClass'>WidgetAPI</a></div><div class='dependency'><a href='#!/api/WorkspaceAPI' rel='WorkspaceAPI' class='docClass'>WorkspaceAPI</a></div><h4>Files</h4><div class='dependency'><a href='source/API.html#BaseAPI' target='_blank'>API.js</a></div></pre><div class='doc-contents'><p>Define Base API</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-scope' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseAPI'>BaseAPI</span><br/><a href='source/API.html#BaseAPI-property-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseAPI-property-scope' class='name expandable'>scope</a> : *<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define scope</p>\n</div><div class='long'><p>Define scope</p>\n</div></div></div><div id='property-silent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseAPI'>BaseAPI</span><br/><a href='source/API.html#BaseAPI-property-silent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseAPI-property-silent' class='name expandable'>silent</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Define silent</p>\n</div><div class='long'><p>Define silent</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-BaseAPI' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseAPI'>BaseAPI</span><br/><a href='source/API.html#BaseAPI-method-BaseAPI' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseAPI-method-BaseAPI' class='name expandable'>BaseAPI</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-_createItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseAPI'>BaseAPI</span><br/><a href='source/API.html#BaseAPI-method-_createItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseAPI-method-_createItem' class='name expandable'>_createItem</a>( <span class='pre'>item, args, [render], [silent], [where]</span> ) : *<span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>Create item API ...</div><div class='long'><p>Create item API</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'>\n</div></li><li><span class='pre'>args</span> : *<div class='sub-desc'>\n</div></li><li><span class='pre'>render</span> : Boolean (optional)<div class='sub-desc'>\n</div></li><li><span class='pre'>silent</span> : Boolean (optional)<div class='sub-desc'>\n</div></li><li><span class='pre'>where</span> : * (optional)<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_executeReference' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseAPI'>BaseAPI</span><br/><a href='source/API.html#BaseAPI-method-_executeReference' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseAPI-method-_executeReference' class='name expandable'>_executeReference</a>( <span class='pre'>arg1, arg2, prefix, [suffix]</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Execute reference function ...</div><div class='long'><p>Execute reference function</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>arg1</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>arg2</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>prefix</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li><li><span class='pre'>suffix</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_renderItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseAPI'>BaseAPI</span><br/><a href='source/API.html#BaseAPI-method-_renderItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseAPI-method-_renderItem' class='name expandable'>_renderItem</a>( <span class='pre'>item, [render], [silent], [where]</span> ) : *<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Render item API ...</div><div class='long'><p>Render item API</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'>\n</div></li><li><span class='pre'>render</span> : Boolean (optional)<div class='sub-desc'>\n</div></li><li><span class='pre'>silent</span> : Boolean (optional)<div class='sub-desc'>\n</div></li><li><span class='pre'>where</span> : * (optional)<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-createItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseAPI'>BaseAPI</span><br/><a href='source/API.html#BaseAPI-method-createItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseAPI-method-createItem' class='name expandable'>createItem</a>( <span class='pre'>args, render</span> ) : *<span class=\"signature\"></span></div><div class='description'><div class='short'>Create reference to function create [item] ... ...</div><div class='long'><p>Create reference to function create [item] ...</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>args</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>render</span> : Boolean<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroyItems' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseAPI'>BaseAPI</span><br/><a href='source/API.html#BaseAPI-method-destroyItems' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseAPI-method-destroyItems' class='name expandable'>destroyItems</a>( <span class='pre'>[items], [silent]</span> ) : *<span class=\"signature\"></span></div><div class='description'><div class='short'>Create reference to function destroy [items] ... ...</div><div class='long'><p>Create reference to function destroy [items] ...</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>items</span> : * (optional)<div class='sub-desc'>\n</div></li><li><span class='pre'>silent</span> : Boolean (optional)<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});