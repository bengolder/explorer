define([
'd3',
'underscore',
'backbone',
'event_manager',
'views/menu_item',
'hbs!templates/menu_item_group',
'hbs!templates/menu_button',
'hbs!templates/dropdown',
], function(
	d3, 
	_,
	BB, 
	Events,
	MenuItemView, 
	groupTemplate,
	buttonTemplate,
	dropdownTemplate
) {

var MenuView = BB.View.extend({

// A MenuView represents a single dropdown menu
// It acts as a node in a linked list, and is 
// aware of any menus to its right
// or left

className: 'btn-group',

initialize: function (options, left, right) {
	var me = this;
	this.map = d3.map();
	this.options = options;
	this.choice = this.options.choice;
	this.choiceHandler = options.choiceHandler;
	this.left = left;
	this.right = right;
	this.render();
	this.dropdown = this.$el.find("ul");
	this.buildMenu();
},

buildMenu: function(){
	// this builds the individual items in the menu
	var menuItems = this.options.menuItems;
	var me = this;
	menuItems.forEach(function(item){
		me.addMenuItem(item);
	});
},

addMenuItem: function(item){
	var me = this;
	if(item.isGroup) {
		// if the item is in a group
		// append the group template
		this.dropdown.append(
			groupTemplate(item)
		);
		// and then add the individual items in the group
		item.groupItems.forEach(function(item){
			me.addMenuItem(item);
		});
	} else {
		// initialize a new menu item view
		var menuItem = new MenuItemView(item, this);
		this.map.set(item.menuName, menuItem);
		this.dropdown.append(menuItem.$el);
		if( item == this.choice ) {
			// if this item is chosen, make 
			// sure it has the 'chosen' css class
			menuItem.$el.addClass("chosen");
		}
	}
},

chooseItem: function(menuName){
	var menuItem = this.map.get(menuName);
	Events.trigger("menuItemChosen", menuItem.item, this);
	// replace the current choice with this one
	var currentChoice = this.map.get(this.choice.menuName);
	currentChoice.$el.removeClass("chosen");
	this.choice = menuItem.item;
	menuItem.$el.addClass("chosen");
	this.renderButton();
},

renderButton: function(){
	var text;
	if( this.choice == undefined ) { 
		text = " ";
	} else {
		text = this.choice.menuName;
	}
	var element = buttonTemplate({
		choiceText: text
	});
	var button = this.$el.children('button.dropdown-toggle');
	if( button.length < 1 ) {
		this.$el.append(element);
	} else {
		button.replaceWith(element);
	}
},

render: function () {
	this.renderButton();
	this.dropdown = $(dropdownTemplate());
	this.$el.append(this.dropdown);
},

});

return MenuView;
});

