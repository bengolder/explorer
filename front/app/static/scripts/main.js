'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: '$'
        }
    },
    paths: {
        d3: '../bower_components/d3/d3',
        topojson: '../bower_components/topojson/topojson',
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        text: '../bower_components/text/text',
		hbs: '../bower_components/require-handlebars-plugin/hbs',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
	'views/app',
	'underscore',
	'jquery',
	'd3',
	'backbone',
	'bootstrap',
], function (AppView) {
	var app = new AppView();
});
