/*
 * This should be routing everything, but it is currently unimplemented
 */
define([
'jquery',
'underscore',
'backbone'
],
function ($, _, BB) {
	var AppRouter = BB.Router.extend({
		routes: {
			'search/:query': 'search',
			'list/:noun': 'list',
			'detail/:noun': 'detail',
			'*actions':'defaultAction'
		},
		search: function (query){
			alert('doing search of "'+query+'"');
		}
	});
	return AppRouter;
});
