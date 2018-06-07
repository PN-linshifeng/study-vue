/**************\
 *                                                                ____   _____
 * DlHighlight -- a JavaScript-based syntax highlighting engine.  \  /_  /   /
 *                                                                 \  / /   /
 *        Author: Mihai Bazon, http://mihai.bazon.net/blog          \/ /_  /
 *     Copyright: (c) Dynarch.com 2007.  All rights reserved.        \  / /
 *                http://www.dynarch.com/                              / /
 *                                                                     \/
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
\******************************************************************************/
var DlHighlight;
(function() {
	var H = DlHighlight = function(args) {
		var self = this;
		this.args = {};

		function D(name, val) {
			if (name in args) val = args[name];
			self.args[name] = val;
		};
		D("replaceTabs", null);
		D("lineNumbers", false);
		D("noTrim", false);
		D("showWhitespace", false);
		var lang = this.lang = H.LANG[args.lang];
		this.tokenParsers = lang.tokens.slice(0).reverse();
		if (this.args.replaceTabs != null) {
			var tab = " ";
			while (--this.args.replaceTabs > 0) tab += "&nbsp;";
			this.args.replaceTabs = tab;
		}
	};
	H.is_ie = /MSIE/.test(navigator.userAgent) && !/Gecko|KHTML|Opera/.test(navigator.userAgent);
	H.BASE = {
		COMMENT_CPP: function(txt) {
			if (txt.charAt(0) == "/" && txt.charAt(1) == "/") {
				var nl = txt.indexOf("\n");
				if (nl == -1) nl = txt.length;
				var c = this.lang.onComment.call(this, this._he(txt.substring(2, nl)));
				return {
					content: {
						escaped: c
					},
					style: "comment comment-line",
					type: "comment",
					index: nl,
					before: "//"
				};
			}
		},
		COMMENT_C: function(txt) {
			if (txt.charAt(0) == "/" && txt.charAt(1) == "*") {
				var nl = txt.indexOf("*/"),
					c, index = nl;
				if (nl == -1) nl = index = txt.length;
				else index += 2;
				c = this.lang.onComment.call(this, this._he(txt.substring(2, nl)));
				c = c.replace(/^\s*[*\\|]+/mg, function(s) {
					return "<span class='before'>" + s + "</span>";
				});
				return {
					content: {
						escaped: c
					},
					before: "/*",
					after: "*/",
					index: index,
					style: "comment comment-multiline",
					type: "comment"
				};
			}
		},
		STRING: {
			regexp: /^(\x22(\\.|[^\x22\\])*\x22|\x27(\\.|[^\x27\\])*\x27)/g,
			content: function(m) {
				m = m[1];
				m = m.substr(1, m.length - 2);
				if (this.args.showWhitespace) m = m.replace(/\x20/g, "_");
				return m;
			},
			before: function(m) {
				return m[1].charAt(0);
			},
			after: function(m) {
				return m[1].charAt(0);
			},
			type: "string",
			style: "string"
		},
		PAREN: {
			regexp: /^[\](){}\[]/g,
			content: 0,
			type: "paren",
			style: "paren"
		},
		OPERATOR: function(txt) {
			var m = /^[<>!+=%&*\x2f|?:-]+/.exec(txt);
			if (m && m[0] != "!/") return {
				content: m[0],
				index: m.lastIndex,
				type: "operator",
				style: "operator"
			};
		}
	};
	H.prototype = {
		formatToken: function(tok) {
			var cls = tok.style,
				html = buffer();
			if (cls instanceof Array) cls = cls.join(" ");
			html("<span class='", cls, "'>");
			if (tok.before) html("<span class='before'>", this._he(tok.before), "</span>");
			html(this._he(tok.content));
			if (tok.after) html("<span class='after'>", this._he(tok.after), "</span>");
			html("</span>");
			return html.get();
		},
		formatUnknown: function(txt) {
			return this._he(txt);
		},
		getLastToken: function(pos) {
			return this.tokens[this.tokens.length - (pos || 0) - 1];
		},
		lastTokenType: function(re) {
			var t = this.getLastToken();
			if (t) return re.test(t.type);
			return false;
		},
		parseToken: function(test, code) {
			var m, tok;
			if (test.regexp) {
				test.regexp.lastIndex = 0;
				m = test.regexp.exec(code);
				if (m) {
					tok = {
						type: test.type,
						style: test.style,
						index: test.regexp.lastIndex
					};
					reAdd(this, "before", m, test, tok);
					reAdd(this, "after", m, test, tok);
					reAdd(this, "content", m, test, tok);
				}
			} else {
				tok = test.call(this, code);
			}
			return tok;
		},
		doItNow: function(code) {
			this.lang.start.call(this, code);
			if (!this.args.noTrim) code = code.replace(/\s+$/, "");
			var formatted = [],
				T = this.tokenParsers,
				m, unknown, tok, i, f = 0,
				tokens;
			unknown = "";
			tokens = this.tokens = [];
			while (code.length > 0) {
				m = /^\s+/.exec(code);
				if (m) {
					unknown += m[0];
					code = code.substr(m[0].length);
				}
				for (i = T.length; --i >= 0;) {
					tok = this.parseToken(T[i], code);
					if (tok) break;
				}
				if (tok) {
					if (unknown) formatted[f++] = unknown;
					unknown = "";
					if (!(tok instanceof Array)) tok = [tok];
					var index = 0;
					tokens.push.apply(tokens, tok);
					for (var j = 0; j < tok.length; ++j) {
						var t = tok[j];
						formatted[f++] = t;
						index += getNextIndex(t);
					}
					code = code.substr(index);
				} else {
					unknown += code.charAt(0);
					code = code.substr(1);
				}
			}
			if (unknown) formatted[f++] = unknown;
			for (i = formatted.length; --i >= 0;) {
				f = formatted[i];
				if (typeof f == "string") formatted[i] = this.formatUnknown(f);
				else formatted[i] = this.formatToken(f);
			}
			var html = formatted.join("");
			i = this.args.lineNumbers;
			if (i) {
				if (typeof i != "number") i = 0;
				html = html.replace(/^/mg, function() {
					return "<span class='line-numbers'>" + (++i) + "</span>";
				});
				this.args.lineNumbers = i;
			}
			this.lang.stop.call(this);
			return html;
		},
		_he: function(str) {
			if (str.escaped) return str.escaped;
			str = str.replace(he_re, function(c) {
				return he_re_val[c];
			});
			if (this.args.replaceTabs) str = str.replace(/\t/g, this.args.replaceTabs);
			return str;
		}
	};
	var he_re = /[&<>]/g,
		he_re_val = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;"
		};
	H.LANG = function(id, tokens) {
		if (arguments.length > 0) {
			H.LANG[id] = this;
			this.tokens = tokens;
		}
	};
	H.registerLang = function(type, tokens) {
		f.prototype = new H.LANG;
		f.prototype.constructor = f;

		function f() {
			H.LANG.call(this, type, tokens);
		};
		return new f();
	};
	var P = H.LANG.prototype;
	P.start = P.stop = function() {};
	P.onComment = function(c) {
		return makeUrls(c);
	};

	function makeUrls(s) {
		return s.replace(/\b((https?|ftp):\x2f\x2f[^\s\x22]+)/g, function(url) {
			return "<a href='" + url + "'>" + url + "</a>";
		});
	};

	function reAdd(self, c, m, test, tok) {
		if (test[c] != null) {
			if (typeof test[c] == "number") {
				tok[c] = m[test[c]];
			} else if (typeof test[c] == "function") {
				tok[c] = test[c].call(self, m);
			} else {
				tok[c] = test[c];
			}
		}
	};

	function getNextIndex(tok) {
		var index = tok.index || 0;
		if (!index) {
			if (tok.before) index += tok.before.length;
			if (tok.content) index += tok.content.length;
			if (tok.after) index += tok.after.length;
		}
		return index;
	};
	var buffer = H.is_ie ? function() {
		var a = [],
			idx = 0,
			f = function() {
				for (var i = 0; i < arguments.length; ++i) a[idx++] = arguments[i];
			};
		f.get = function() {
			return a.join("");
		};
		return f;
	} : function() {
		var str = "",
			f = function() {
				str = str.concat.apply(str, arguments);
			};
		f.get = function() {
			return str;
		};
		return f;
	};
})();
(function() {
	var builtins = ["Array", "Date", "Function", "Infinity", "Math", "NaN", "Number", "Object", "Packages", "RegExp", "String", "alert", "decodeURI", "decodeURIComponent", "document", "encodeURI", "encodeURIComponent", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "window"];
	var BUILTINS = {};
	for (var i = builtins.length; --i >= 0;) BUILTINS[builtins[i]] = true;
	var keywords = ["abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with"];
	var KEYWORDS = {};
	for (var i = keywords.length; --i >= 0;) KEYWORDS[keywords[i]] = true;
	var end_q_mark = {
		";": true,
		"{": true,
		"}": true,
		"(": true,
		")": true,
		",": true
	};
	var T = {
		WORD: function(txt) {
			var m = /^(\$?\w+)/.exec(txt);
			if (m) {
				var style = "operand";
				var tok = this.getLastToken();
				if (tok && tok.content == "function") style += " defun";
				var id = m[1];
				if (id in KEYWORDS) {
					style += " keyword";
					if (id == "function") {
						if (tok) {
							if (tok.type == "operator" && tok.content == "=" || tok.type == "hasharrow") tok = this.getLastToken(1);
							if (tok && tok.type == "operand") tok.style += " defun";
						}
					}
				} else if (id in BUILTINS) {
					style += " builtin";
				}
				return {
					content: id,
					index: m[0].length,
					type: "operand",
					style: style
				};
			}
		},
		REGEXP: function(txt) {
			if (!this.lastTokenType(/^operand$/)) {
				var m = /^\x2f((\\.|[^\x2f\\\n])+)\x2f([gim]+)?/.exec(txt);
				if (m) return {
					before: "/",
					content: m[1],
					after: m[3] ? "/" + m[3] : "/",
					style: "regexp",
					type: "regexp",
					index: m[0].length
				};
			}
		},
		ERRORS: {
			regexp: /^[,+*=-]\s*[\)\}\]]/g,
			content: 0,
			style: "error",
			type: "error"
		},
		QUESTIONMARK: function(txt) {
			if (txt.charAt(0) == "?") this.jsQuestionMark++;
		},
		ENDQMARK: function(txt) {
			if (txt.charAt(0) in end_q_mark && this.jsQuestionMark > 0) this.jsQuestionMark--;
		},
		COMMA: function(txt) {
			if (txt.charAt(0) == ',') return {
				content: ",",
				style: "comma",
				type: "comma",
				index: 1
			};
		},
		COLON: function(txt) {
			if (!this.jsQuestionMark && txt.charAt(0) == ":") {
				var tok = this.getLastToken();
				if (tok && /string|operand/.test(tok.type)) {
					tok.style += " hashkey";
					return {
						content: ":",
						style: "hasharrow",
						type: "hasharrow",
						index: 1
					};
				}
			}
		}
	};
	var H = DlHighlight;
	var lang = H.registerLang("js", [H.BASE.COMMENT_CPP, H.BASE.COMMENT_C, H.BASE.STRING, T.WORD, T.REGEXP, T.ERRORS, T.QUESTIONMARK, T.ENDQMARK, T.COMMA, T.COLON, H.BASE.OPERATOR, H.BASE.PAREN]);
	lang.T = T;
	lang.start = function() {
		this.jsQuestionMark = 0;
	};
})();
(function() {
	var outblock_stuff = {
		".": "css-class",
		"#": "css-id",
		":": "css-pseudo-class"
	};
	var T = {
		AT_RULE: {
			regexp: /^@([a-z0-9_-]+)/gi,
			before: "@",
			content: 1,
			style: "keyword css-at-rule"
		},
		OUTBLOCK_STUFF: function(txt) {
			if (!this.cssBlock) {
				var m = /^([.#:])([a-z0-9_-]+)/i.exec(txt);
				if (m) return {
					before: m[1],
					content: m[2],
					index: m[0].length,
					style: outblock_stuff[m[1]]
				};
				if (txt.charAt(0) == ",") return {
					content: ",",
					index: 1,
					style: "css-comma"
				};
			}
		},
		INBLOCK_STUFF: function(txt) {
			if (this.cssBlock) {
				var m = /^([a-z0-9_-]+)(\s*:)/i.exec(txt);
				if (m) return {
					content: m[1],
					after: m[2],
					style: "builtin css-declaration-kw",
					index: m[0].length
				};
				m = /^#(([a-f0-9][a-f0-9][a-f0-9]){1,2})/i.exec(txt);
				if (m) return {
					content: m[1],
					before: "#",
					style: "css-color-spec",
					index: m[0].length
				};
				m = /^(-?[0-9]?\.?[0-9]+)(px|pt|em|ex|%)/i.exec(txt);
				if (m) return {
					content: m[1],
					after: m[2],
					style: "css-length",
					index: m[0].length
				};
			}
		},
		BEGIN_BLOCK: function(txt) {
			if (/^\{/.test(txt)) {
				this.cssBlock++;
				return {
					content: "{",
					style: "paren css-block-open",
					index: 1
				};
			}
		},
		END_BLOCK: function(txt) {
			if (/^\}/.test(txt)) {
				this.cssBlock--;
				return {
					content: "}",
					style: "paren css-block-close",
					index: 1
				};
			}
		},
		PAREN: DlHighlight.BASE.PAREN
	};
	var H = DlHighlight;
	var lang = H.registerLang("css", [H.BASE.COMMENT_C, H.BASE.COMMENT_CPP, H.BASE.STRING, T.AT_RULE, T.OUTBLOCK_STUFF, T.INBLOCK_STUFF, T.BEGIN_BLOCK, T.END_BLOCK]);
	lang.start = function() {
		this.cssBlock = 0;
	};
})();
(function() {
	var H = DlHighlight;
	var T = {
		COMMENT: function(txt) {
			if (txt.indexOf("<!--") == 0) {
				var nl = txt.indexOf("--", 4);
				if (nl == -1) nl = txt.length;
				return {
					before: "<!--",
					after: "-->",
					content: txt.substring(4, nl),
					index: nl + 3,
					type: "comment",
					style: "comment"
				}
			}
		},
		STRING: function(txt) {
			if (this.inXmlTag) return this.parseToken(H.BASE.STRING, txt);
		},
		ATTRIBUTE: function(txt) {
			var r = null;
			if (this.inXmlTag) {
				var m = /^([a-z0-9_-]+)(\s*)=/i.exec(txt);
				if (m) {
					return [{
						content: m[1],
						style: "builtin xml-attribute"
					}, {
						content: m[2]
					}, {
						content: "=",
						style: "operator"
					}];
				}
			}
			return r;
		},
		ENTITY: {
			regexp: /^&(\w+);/g,
			before: "&",
			after: ";",
			content: 1,
			type: "builtin",
			style: "builtin xml-entity"
		},
		START_TAG: function(txt) {
			var m = /^<([a-z0-9_-]+)/i.exec(txt);
			if (m) {
				this.inXmlTag = m[1];
				return [{
					content: "<",
					style: "paren xml-tagangle"
				}, {
					content: m[1],
					style: "keyword xml-tag xml-tag-open"
				}];
			}
		},
		END_TAG: function(txt) {
			var m = /^<\x2f([a-z0-9_-]+)(\s*>)/i.exec(txt);
			if (m) {
				return [{
					content: "</",
					style: "paren xml-tagangle"
				}, {
					content: m[1],
					style: "keyword xml-tag xml-tag-close"
				}, {
					content: m[2],
					style: "paren xml-tagangle"
				}];
			}
		},
		END_ANGLE: function(txt) {
			var m = /^\x2f?>/.exec(txt);
			if (m) {
				this.inXmlTag = false;
				return {
					content: m[0],
					style: "paren xml-tagangle"
				};
			}
		}
	};
	var lang = H.registerLang("xml", [T.COMMENT, T.STRING, T.ATTRIBUTE, T.ENTITY, T.START_TAG, T.END_TAG, T.END_ANGLE]);
	lang.T = T;
	lang.start = function() {
		this.inXmlTag = false;
	};
})();
(function() {
	var re_get_script = /([^\0]*?)<\x2fscript>/gi;
	var H = DlHighlight,
		xml = H.LANG.xml;

	function END_ANGLE(txt) {
		var m = /^\x2f?>/.exec(txt);
		if (m) {
			var tag = this.inXmlTag;
			this.inXmlTag = false;
			var tok = [{
				content: m[0],
				style: "paren xml-tagangle"
			}];
			if (/^script$/i.test(tag) && !/><\x2fscript>/i.test(txt)) {
				re_get_script.lastIndex = 1;
				var m = re_get_script.exec(txt);
				if (m && m[1] && m.index == 1) {
					var code = m[1];
					var index = re_get_script.lastIndex - 10;
					var js = new H({
						lang: "js",
						noTrim: true
					}).doItNow(code);
					var jstok = {
						content: {
							escaped: js
						},
						style: "xml-inline-script",
						index: index
					};
					tok.push(jstok);
				}
			}
			return tok;
		}
	};
	H.registerLang("html", [xml.T.COMMENT, xml.T.STRING, xml.T.ATTRIBUTE, xml.T.ENTITY, xml.T.START_TAG, xml.T.END_TAG, END_ANGLE]);
})();
(function() {
	function getText(el) {
		if (el.innerText != null) return el.innerText;
		if (el.textContent != null) return el.textContent;
		if (el.nodeType == 1) {
			var txt = [],
				i = el.firstChild;
			while (i) {
				txt.push(getText(i));
				i = i.nextSibling;
			}
			return txt.join("");
		} else if (el.nodeType == 3) {
			return el.data;
		}
		return "";
	};
	DlHighlight.HELPERS = {
		highlightByName: function(name, tag, args) {
			if (!args) args = {};
			if (!tag) tag = "pre";
			var a = document.getElementsByTagName(tag);
			for (var i = a.length; --i >= 0;) {
				var el = a[i];
				if (el.getAttribute("name") == name) {
					var code = el._msh_text || getText(el);
					el._msh_text = code;
					args.lang = el._msh_type || el.className;
					el._msh_type = args.lang;
					var hl = new DlHighlight(args);
					code = hl.doItNow(code);
					if (DlHighlight.is_ie) {
						var div = document.createElement("div");
						div.innerHTML = "<pre>" + code + "</pre>";
						while (div.firstChild) el.appendChild(div.firstChild);
					} else el.innerHTML = code;
					el.className = "DlHighlight " + el.className;
				}
			}
		}
	};
})();
window.DlHighlight = DlHighlight;
export default DlHighlight;