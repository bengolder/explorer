var BB = require('backbone');
var template = require('../templates/menu_item.hbs');

var MenuItemView = BB.View.extend({
	el: 'li',

	events: { 'click': 'select' },

	initialize: function (item, menu) {
		this.item = item;
		this.menu = menu;
		this.render();
	},

	render: function(){
		this.setElement(template({
			itemName: this.item.menuName,
		}));
	},

	select: function() {
		this.menu.chooseItem(this.item.menuName);
	},

});

module.exports = MenuItemView;
