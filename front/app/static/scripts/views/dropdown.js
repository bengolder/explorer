define([
'jquery',
'backbone',
'hbs!templates/dropdown'
], function($, BB, template) {

var DropDownView = BB.View.extend({
	el: 'ul',
	className: 'dropdown-menu',
	initialize: function () {
		this.render();
	},
	render: function () {
		this.$el.html(template({
		}));
	},
});

return DropDownView;
});

