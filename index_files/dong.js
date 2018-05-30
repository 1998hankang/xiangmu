window.addEvent('domready', function() {

	function hoverevent(hobjname, hobjclass) {
		hobjname.addEvents({
			'mouseenter': function() {
				this.addClass(hobjclass)
			},
			'mouseleave': function() {
				this.removeClass(hobjclass)
			}
		})
	};
	
    try {
        new hoverevent($('dropnavin'), 'dHover')
    } catch(e) {};
    try {
        new hoverevent($$('.items-gallery'), 'dHover')
    } catch(e) {};
    try {
        new hoverevent($$('.goods-dong-multiple-body .item'), 'dHover')
    } catch(e) {};

	var ranks = $$('.dRank,.goods-dong-rank');
	ranks.each(function(item) {
		if (item) {
			var rank = item.getElements('.item'),
				rankimg = rank.getElement('.p');
			rank.each(function(rankj, j) {
				if (j == 0) {
					rankj.addClass('active');
					rankj.getElement('.p').style.display = ""
				};
				rankj.addEvent('mouseenter', function() {
					rank.removeClass('active');
					rankimg.setStyle('display', '');
					this.addClass('active');
					this.getElement('.p').style.display = ""
				})
			})
		}
	});

var findend = function(needle, str) {
			var pos;
			if (pos = (str + "").lastIndexOf(needle)) {
				return str.substr(pos + needle.length)
			}
		};
	var findext = function(src) {
			if (!src) return "";
			return findend("/", src).replace(/[,._]/g, "-")
		};
	var furl = function(url) {
			var pros = findext(url).split("-");
			if (pros.length > 1) return pros[1]
		};
	var local = u = location.href,
		n;
	if (u.indexOf("product") != -1) {
		u = (n = $$(".basic-ex-breadcrumbs a")) && n.length ? findext(n[n.length - 1].href) : u
	}
	var u = furl(u);
	var active = false;
	var getHandle = function(depth, sign) {
			depth = depth.getElement("dt");
			var span = new Element("span");
			if (!sign) {
				span.set("html", "&nbsp;").addClass("nosymbols").inject($(depth), "top");
				return depth
			}
			span.set("html", "+").addClass("symbols").inject($(depth), "top");
			return depth
		};
	try {
		var catbox = $$(".cat-dong-rela")[0],
			cats = $$(".cat-dong-rela li.lv1"),
			depthroots = $$(".cat-dong-rela li.lv1 dl");
		depthroots.each(function(root, index) {
			if (!root) return false;
			var depth2 = root.getElement("dd");
			if (depth2) {
				var handle = getHandle(root, true);
				handle.addEvent("click", function(e) {
					if (depth2.style.display != "none") {
						depth2.style.display = "none";
						this.getElement("span").set("html", "+")
					} else {
						depth2.style.display = "block";
						this.getElement("span").set("html", "-")
					}
				})
			}
		});
		cats.each(function(cat, l) {
			var a = cat.getElements("a");
			if (u == furl(a[0].href)) {
				cat.store("active", cat.addClass("active"));
				a[0].getParent("li.lv1").getElement("dd").setStyle("display", "block");
				a[0].getParent("li.lv1").getElement("dt").getElement("span").set("html", "-")
			}
			for (var k = 1; k < a.length; k++) {
				var a1 = a[k];
				if (!active && (local == a1.href || u == furl(a1.href))) {
					a1.addClass("now");
					cat.store("active", cat.addClass("active"));
					active = true;
					a1.getParent("dl").getElement(".symbols").set("html", "-");
					a1.getParent("dl").getElement("dd").setStyle("display", "block")
				}
			}
		})
	} catch (e) {};
	$('sideGotop').addEvent('click', function() 
 { new Fx.Scroll(window,{link:'cancel'}).toTop()});
	try {
		var maxcopya = $$('.fbody a[href=http://www.shopex.cn]')[0].getParent('div');
		$$('.Copyright')[0].adopt(maxcopya)
	} catch (e) {};
	var brandfold = $$('.brand-table dd')[0];
	if (!brandfold) return;
	if (brandfold.offsetHeight > 40) {
		var unfolddiv = new Element('a.brandunFold[href=javascript:;][text=更多]'),
			folddiv = new Element('a.brandFold[href=javascript:;][text=收起]');
		brandfold.setStyles({
			'height': 40 + 'px',
			'overflow': 'hidden'
		}).adopt(unfolddiv, 'top');
		unfolddiv.addEvent('click', function() {
			folddiv.replaces(unfolddiv);
			brandfold.setStyle('height', 'auto')
		});
		folddiv.addEvent('click', function() {
			unfolddiv.replaces(folddiv);
			brandfold.setStyles({
				'height': 40 + 'px',
				'overflow': 'hidden'
			})
		})
	}

						
});
function AddFavorite(sURL, sTitle) {
	try {
		window.external.addFavorite(sURL, sTitle)
	} catch (e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "")
		} catch (e) {
			alert("您的浏览器不支持此操作，请使用Ctrl+D进行添加")
		}
	}
};

function SetHome(obj, vrl) {
	try {
		obj.style.behavior = 'url(#default#homepage)';
		obj.setHomePage(vrl)
	} catch (e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
			} catch (e) {
				alert("您的浏览器不支持此操作！\n请在浏览器地址栏输入about:config并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'")
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', vrl)
		}
	}
};