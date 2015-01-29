Ext.data.JsonP.BaseImage({"tagname":"class","name":"BaseImage","autodetected":{},"files":[{"filename":"Image.js","href":"Image.html#BaseImage"}],"members":[{"name":"_baseImg","tagname":"property","owner":"BaseImage","id":"property-_baseImg","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"BaseImage","id":"method-constructor","meta":{}},{"name":"process1","tagname":"method","owner":"BaseImage","id":"method-process1","meta":{}},{"name":"process2","tagname":"method","owner":"BaseImage","id":"method-process2","meta":{}},{"name":"resizeDataURL","tagname":"method","owner":"BaseImage","id":"method-resizeDataURL","meta":{}},{"name":"toDataURL","tagname":"method","owner":"BaseImage","id":"method-toDataURL","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-BaseImage","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Image.html#BaseImage' target='_blank'>Image.js</a></div></pre><div class='doc-contents'><p>Define BaseImage</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_baseImg' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseImage'>BaseImage</span><br/><a href='source/Image.html#BaseImage-property-_baseImg' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseImage-property-_baseImg' class='name expandable'>_baseImg</a> : <a href=\"#!/api/BaseImage\" rel=\"BaseImage\" class=\"docClass\">BaseImage</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Init base image</p>\n</div><div class='long'><p>Init base image</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseImage'>BaseImage</span><br/><a href='source/Image.html#BaseImage-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/BaseImage-method-constructor' class='name expandable'>BaseImage</a>( <span class='pre'></span> ) : <a href=\"#!/api/BaseImage\" rel=\"BaseImage\" class=\"docClass\">BaseImage</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/BaseImage\" rel=\"BaseImage\" class=\"docClass\">BaseImage</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-process1' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseImage'>BaseImage</span><br/><a href='source/Image.html#BaseImage-method-process1' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseImage-method-process1' class='name expandable'>process1</a>( <span class='pre'>scope, u</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Define process1 ...</div><div class='long'><p>Define process1</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>scope</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>u</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-process2' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseImage'>BaseImage</span><br/><a href='source/Image.html#BaseImage-method-process2' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseImage-method-process2' class='name expandable'>process2</a>( <span class='pre'>scope</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Define process2 ...</div><div class='long'><p>Define process2</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>scope</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-resizeDataURL' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseImage'>BaseImage</span><br/><a href='source/Image.html#BaseImage-method-resizeDataURL' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseImage-method-resizeDataURL' class='name expandable'>resizeDataURL</a>( <span class='pre'>data, width, height, callback</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size ...</div><div class='long'><p>Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">string</a><div class='sub-desc'>\n</div></li><li><span class='pre'>width</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>height</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>callback</span> : function<div class='sub-desc'><p>@example\n          resizeDataURL('data-uri', w, h, function(err, base64Img){\n                console.log('IMAGE:',base64Img);\n             })</p>\n</div></li></ul></div></div></div><div id='method-toDataURL' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseImage'>BaseImage</span><br/><a href='source/Image.html#BaseImage-method-toDataURL' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseImage-method-toDataURL' class='name expandable'>toDataURL</a>( <span class='pre'>url, callback, [outputFormat], [quality]</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Converts an image to a base64 string. ...</div><div class='long'><p>Converts an image to a base64 string.\nIf you want to use the outputFormat or quality param\nI strongly recommend you read the docs\n mozilla for <code>canvas.toDataURL()</code></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>url</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li><li><span class='pre'>callback</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'>\n</div></li><li><span class='pre'>outputFormat</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'>\n<p>Defaults to: <code>&#39;image/png&#39;</code></p></div></li><li><span class='pre'>quality</span> : float (optional)<div class='sub-desc'><p>@url      https://gist.github.com/HaNdTriX/7704632/\n@docs     https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement#Methods\n@example\n          toDataURL('http://goo.gl/AOxHAL', function(err, base64Img){\n                console.log('IMAGE:',base64Img);\n             })</p>\n<p>Defaults to: <code>0.0 to 1.0</code></p></div></li></ul></div></div></div></div></div></div></div>","meta":{}});