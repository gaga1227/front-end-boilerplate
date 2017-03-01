window.App = (function (app) {
	App = app || {};

	// properties
	// -------------------------------------------------------------------------------------------

	App.name = 'Front-End Boilerplate';
	App.version = '1.0.0';
	App.lastUpdate = '2017-03';

	// init
	// -------------------------------------------------------------------------------------------

	App.init = function () {
		//init app modules
		App.utils.init();
		App.data.init();
		App.view.init();
	};

	return App;
})(window.App);

// init App
App.init();
