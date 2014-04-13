define([
'backbone',
'hbs!templates/menu_item'
], 
function (BB, template) {
var MenuItemView = BB.View.extend({
el: 'li',
events: {
	'click': 'select'
},
initialize: function (item, menu) {
	this.item = item;
	this.menu = menu;
	this.render();
},
render: function(){
	this.setElement(template({
		itemName: this.item.menuName(),
	}));
},
select: function() {
	this.menu.chooseItem(this.item.menuName());
},
});
return MenuItemView;
});
