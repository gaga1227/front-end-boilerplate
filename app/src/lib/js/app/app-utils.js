window.App = (function (app) {
	var App = app || {};

	// utils module
	App.utils = {

		// addDeviceClass
		addDeviceClass: function () {
			// using is.js
			var p = window.is;

			$html = $('html:eq(0)');
			$html.removeClass('no-js').addClass('js');

			// exit
			if (p === undefined) {
				return;
			}

			// touch
			if (p.touchDevice()) {
				$html.addClass('touch');
			} else {
				$html.addClass('no-touch');
			}

			// platform
			if (p.desktop()) {
				$html.addClass('desktop');
			} else if (p.tablet()) {
				$html.addClass('tablet');
			} else if (p.mobile()) {
				$html.addClass('mobile');
			}

			// browser
			if (p.ie()) {
				$html.addClass('ie');
			}

			// iOS
			if (p.ios()) {
				$html.addClass('ios');
				if (p.iphone()) {
					$html.addClass('iphone');
				} else if (p.ipod()) {
					$html.addClass('ipod');
				} else if (p.ipad()) {
					$html.addClass('ipad');
				}
			}
			// android
			else if (p.android()) {
				$html.addClass('android');
				if (p.androidPhone()) {
					$html.addClass('androidPhone');
				} else if (p.androidTablet()) {
					$html.addClass('androidTablet');
				}
			}
		},

		// load Templates
		loadTemplates: function () {
			var $templates = $('script[id|="template"]');
			if (!$templates.length) {
				return;
			}

			var templates = {};
			_.forEach($templates, function (tmpl) {
				var $tmpl = $(tmpl);
				var name = $tmpl.attr('id').split('-')[1];
				tmplHtml = $.trim($tmpl.html());
				if (tmplHtml) {
					templates[name] = tmplHtml;
				}
			});

			return templates;
		},

		// init
		// -------------------------------------------------------------------------------------------
		init: function () {
			this.addDeviceClass();
		}
	};

	return App;
})(window.App);
