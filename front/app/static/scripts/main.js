/*global require*/
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
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        text: '../bower_components/requirejs-text/text',
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
