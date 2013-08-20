/*! surt 20-08-2013 */
!function(a,b){function c(a){var b=new RegExp(f,"g");return a.replace(b," ")}function d(a,b){var c=!0;if(a=a||[],b=b||[],!a.length||!b.length)return!(a.length||b.length);if(a.length==b.length){for(var d=0;d<a.length;d++)c=c&&a[d].text==b[d].text&&a[d].type==b[d].type;return c&&a.length==b.length}}var e,f=String.fromCharCode(160),g={input:".surt__input",suggest:".surt__suggests",suggestItemCls:"surt__suggests-item"},h=function(b){function c(a,b){if(!a||1!=a.nodeType)throw new Error("Surt: html element "+b+" not found or it has wrong nodeType")}b=b||{};for(var d in g)b[d]||(b[d]=g[d]);if(e=a.jQuery||b.$){b&&b.root||!this||!this[0]||1!=this[0].nodeType||(b.root=this[0]);try{if(b.root=e(b.root)[0],c(b.root,"params.root"),b.input&&(b.input=e(b.input,b.root)[0]),b.input||(b.input=e('[contenteditable="true"]',b.root)),c(b.input,"params.input"),"true"==e(b.root).attr("data-surt-inited"))throw new Error("Surt: already initialized");ret=new h.fn.constructor(b,e)}catch(f){return console.warn(f.name+": ",f.message),void 0}return ret}};h.fn={constructor:function(a,b){function c(){clearTimeout(f._upTimer),f._upTimer=setTimeout(function(){f._pressedKeys=0},300)}function d(){var a=f.args();a.kit=f.suggest[f._activeSuggest],f.set({kit:a.kit},!0),f.restoreCursor(f.text().length)}function e(a){return 37==a||39==a||16==a||17==a||18==a||91==a||35==a||36==a||13==a}var f=this,g=a.root;a=a||{},this.$=b,this.params=a,this.parser=h.parser,this.inputNode=b(a.input,g)[0],this.root=b(a.root,g)[0],this.suggestNode=b(a.suggest,g)[0],this.cloneNode=b(a.clone,g)[0],this.autocompleteNode=b(a.autocomplete,g)[0],this.delimiter=a.delimiter||"",this._pressedKeys=0,this._time=(new Date).getTime(),this._events={},this.kit=[],this._activeSuggest=-1,b(this.root).attr("data-surt-inited",!0),b(this.inputNode).on("keyup",function(c){var d,g=c.keyCode;return f._pressedKeys--,e(g)?!0:((40!=g&&38!=g||!b(f.root).hasClass(a.suggestCls))&&(f.updateInput(),f.updateAutocomplete(),d=f.args(),a.change&&a.change(c,d)),void 0)}).on("keydown input paste",function(g){var h,i,j=g.keyCode;if("keydown"!=g.type||e(j)||(f._pressedKeys++,c()),e(j)&&(f._pressedKeys=0),13==j)return g.preventDefault(),b(f.root).hasClass(a.suggestCls)&&b("."+a.suggestItemCurrentCls).length?d():f.params.submit&&f.params.submit(),b(f.root).removeClass(a.suggestCls),b(f.root).removeClass(a.autocompleteCls),f.markSuggest(-1),!1;if(40==j)return h=0,f._activeSuggest>=0&&(h=f._activeSuggest<f.suggest.length-1?f._activeSuggest+1:0),f.markSuggest(h),!1;if(38==j)return h=f.suggest.length-1,f._activeSuggest>=0&&(h=f._activeSuggest>0?f._activeSuggest-1:f.suggest.length-1),f.markSuggest(h),!1;if(39==j){var k=f.text().length;b(f.root).hasClass(a.suggestCls)&&b(f.root).hasClass(a.autocompleteCls)&&f.getCursor()>=k&&(i=f.args(),i.kit=f.suggest[0],f.set(i,!0),f.restoreCursor(f.text().length))}}).on("paste",function(){setTimeout(function(){f.parse()},0)}).on("focus",function(){b(f.root).addClass(f.params.stateFocusCls)}).on("blur",function(){b(f.root).removeClass(f.params.stateFocusCls),b(f.root).removeClass(f.params.readyCls)}),this._events.click=function(){var c=b("."+a.suggestItemCls),d=c.index(b(this)),e=f.args();e.kit=f.suggest[d],f.set(e,!0)},b(this.root).on("click",function(a){b(a.target).closest(f.root).length||b(f.root).removeClass(f.params.suggestCls).removeClass(f.params.autocompleteCls),a.stopPropagation()}).on("click","."+f.params.suggestItemCls,f._events.click)},semanticChanged:function(a){return!d(a,this.kit)},get:function(){return this.kit},set:function(a,c){if(a=a||{},!(this._pressedKeys>0)){a.kit&&a.kit.length===b&&(a.kit=[a.kit]);var e=d(a.kit,this.kit);a.kit&&(this.kit=a.kit),this.suggest=a.suggest,this.saveCursor(),this.updateSuggest(),(!e||c)&&this.updateKit(c),this.updateAutocomplete(),this.restoreCursor()}},setKit:function(a){this.kit=a,this.updateKit()},update:function(){this.updateKit(),this.updateSuggest(),this.updateAutocomplete()},updateInput:function(){var a=this.parse(),b=this.brick(a),c=this.getTail(b);(this.semanticChanged(b)||c)&&(this.setKit(b),c&&"text"!=this.params.inputMode&&(e(this.inputNode).append(c.replace(" ","&nbsp;")),this.restoreCursor(999)))},updateKit:function(a){var b=[],c=this.params.tokenCls,d=this.params.textCls||c,e="",f="";if(this.kit){this.saveCursor();for(var g=0;g<this.kit.length;g++){var h=this.kit[g].text.trim();"text"!=this.params.inputMode&&("text"==this.kit[g].type&&d?(e='<div class="'+d+'">',f="</div>"):c&&(e='<div class="'+c+" "+c+"_type_"+this.kit[g].type+'">',f="</div>"),h=e+h+f),b.push(h)}b=b.join(this.delimiter+" "),("text"!=this.params.inputMode||a)&&(this.html(b),this.restoreCursor())}},updateSuggest:function(){var a=[],b=this.params.tokenCls,c=this.params.textCls||b;if(this.suggest){for(var d=0;d<this.suggest.length;d++){for(var f=[],g=0;g<this.suggest[d].length;g++){var h=this.suggest[d][g].text.trim();"text"!=this.suggest[d][g].type?(b&&(h='<div class="'+b+" "+b+"_type_"+this.suggest[d][g].type+'">'+h+"</div>"),f.push(h)):(c&&(h='<div class="'+c+'">'+h+"</div>"),f.push(h))}f=f.join(this.delimiter+" "),a.push('<li class="'+this.params.suggestItemCls+'">'+f+"</li>"),this._activeSuggest=-1}a=a.join(""),this.suggestNode&&(a?e(this.root).addClass(this.params.suggestCls):e(this.root).removeClass(this.params.suggestCls),this.suggestNode.innerHTML=a)}},updateAutocomplete:function(){var a=self._activeSuggest||0,b=this.suggest&&this.suggest.length&&this.suggest[a],c=this.text();if(this.kit&&this.kit.length&&this.cloneNode)if(b&&b.length){var d,f,g=(this.kit[this.kit.length-1].text,0);if(d=[],this.suggest[0].length>g)for(var h=g;h<this.suggest[0].length;h++)d.push(this.suggest[0][h].text);d=d.join(this.delimiter+" "),d==c?e(this.root).addClass(this.params.readyCls):(f=0==d.toLowerCase().indexOf(c.toLowerCase()),e(this.root).removeClass(this.params.readyCls)),this.autocompleteNode.innerHTML=d.slice(c.length),this.cloneNode.innerHTML=this.html(),e(this.root).hasClass(this.params.suggestCls)&&f?e(this.root).addClass(this.params.autocompleteCls):e(this.root).removeClass(this.params.autocompleteCls)}else this.autocompleteNode.innerHTML="",e(this.root).removeClass(this.params.autocompleteCls);else e(this.root).removeClass(this.params.autocompleteCls)},query:function(a){var b="";a=a||this.kit;for(var d=0;d<a.length;d++)d>0&&(b+=" "),b+=a[d].text;return c(b)},text:function(a){return a?(this.html(a),void 0):c(e(this.inputNode).text()||e(this.inputNode).val())},html:function(a){return a?("INPUT"==this.inputNode.tagName?e(this.inputNode).val(a):e(this.inputNode).html(a),void 0):e(this.inputNode).html()||this.text()},args:function(){var a={};return a.kit=this.kit,a.suggest=this.suggest||[],a.text=this.text(),a},parse:function(){var a=this.text();return this.trailingSpace=" "===a[a.length-1],newKit=this.parser(this.kit,a)},brick:function(a){var b=!0,c=this.text(),d=[];if(a)for(var e=0;e<a.length;e++){var f=this.suggest&&this.suggest[0]&&this.suggest[0][e];b=b&&f&&a[e].text.toLowerCase()==f.text.toLowerCase(),d.push(f)}return b&&c[c.length-1]==this.delimiter?d:a},markSuggest:function(a){var b=e("."+this.params.suggestItemCls),c=this.params.suggestItemCurrentCls;b.removeClass(c),a>=0&&(b.eq(a).addClass(c),this._activeSuggest=a)},getTail:function(a){var b,c=this.text(),d=[];if(a=a||this.kit)for(var e=0;e<a.length;e++)d.push(a[e].text);return d=d.join(this.delimiter+" "),0==c.indexOf(d)&&(b=c.substr(d.length,c.length)),b},minimize:function(){e(this.root).removeClass(this.params.suggestCls)},dispose:function(){e(this.root).attr("data-surt-inited","disposed"),e(this.root).off("click","."+this.params.suggestItemCls,this._events.click),clearTimeout(this._upTimer)}},h.fn.constructor.prototype=h.fn,a.surt=h,"undefined"!=typeof module&&(module.exports=h),h.version="0.2.3"}(this),function(a,b){function c(a){var b="";if(a)for(var c=0;c<a.length;c++)c>0&&(b+=" "),b+=a[c].text;return b}var d=a.surt||{},e=function(a,d){function e(a){"text"==a.type&&f.length&&"text"==f[f.length-1].type?f[f.length-1].text+=" "+a.text:f.push(a),g=g.replace(a.text,"").trim()}var f=[],g=d;if(this.delimiter&&(g=g.replace(new RegExp(this.delimiter,"g")," ")),g=g.replace(new RegExp("  ","g")," "),c(a)===g)return a;if(a)for(var h=0;h<a.length;h++){var i=g.indexOf(a[h].text),j=g[i-1],k=g[i+a[h].text.length];if((" "!==k&&k!==b||" "!==j&&j!==b)&&(i=-1),0==i)e(a[h]);else if(i>0){var l=g.substring(0,i).trim();e({text:l,type:"text"}),e(a[h])}}return g=g.trim(),g&&e({text:g,type:"text"}),f};d.parser=e,"undefined"!=typeof module&&(module.exports=e)}(this),function(a){function b(a,b){for(var c=0,d=0;d<a.childNodes.length;d++){var e=$(a.childNodes[d]).text().length;if(c+=e,c>=b)return{child:a.childNodes[d],n:b-(c-e)}}return 0>b&&(c=0),{child:a.childNodes[a.childNodes.length-1],n:c}}var c=a.surt||{};c.fn=c.fn||{},c.fn.getCursor=function(){if(a.getSelection){var b=a.getSelection();if(b.anchorNode){for(var c=b.getRangeAt(0),d=c.startContainer,e=c.startOffset,f=d,g=e;f&&f!=this.inputNode;){for(var h,i=f.previousSibling;i;)h=$(i).text(),g+=h.length,i=i.previousSibling;f=f.parentNode}return g}}},c.fn.saveCursor=function(){return this.cursorPos=this.getCursor(),this._lastPos=this.cursorPos==this.text().length,this.cursorPos},c.fn.restoreCursor=function(c){if(a.getSelection){var d,e=document.createRange(),f=a.getSelection(),g=this.inputNode;for(d=this._lastPos?this.text().length:this.cursorPos,c=c||d;g&&1==g.nodeType;)obj=b(g,c),g=obj.child,c=obj.n;g&&3==g.nodeType&&(c=Math.min(c,this.$(g).text().length),c=Math.max(c,0),e.setStart(g,c),e.collapse(!0),f.removeAllRanges(),f.addRange(e)),this.inputNode.focus()}}}(this);