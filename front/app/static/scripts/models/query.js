define([
'jquery',
'underscore',
'backbone'
], function ($, _, BB) {
var Query = BB.Model.extend({
// a query's responsibility is to manage a collection of query fragments
initialize:function(atts, opts){
	this.fragments = [];
},
});
return Query;
});
