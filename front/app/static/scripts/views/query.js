define([
'jquery',
'backbone',
'views/param',
'hbs!templates/query_bar'
], function($, BB, ParamView, template) {
var QueryView = BB.View.extend({

initialize: function () {
	// this should initialize once
	// and then should allow subviews to handle their own rendering
	this.render();
	this.initSubViews();
},

initSubViews: function () {
	// setup params
	this.params = [];
	var child = new ParamView();
	this.params.push(child);
	this.$(".query-view").append(child.$el);
},

render: function () {
	this.$el.html(template());
},

drop_it: function() {
	// a method for intializing a dropdown
}

});

return QueryView;
});
