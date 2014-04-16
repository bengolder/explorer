define([
'jquery', 'backbone',
'views/menu',
'views/list',
'event_manager',
'data_manager',
], function($, BB, 
	MenuView, 
	List,
	Events, 
	Data
) {
var QueryView = BB.View.extend({
className: 'btn-group',

initialize: function () {
	// this should initialize once
	// it should then handle the creation and destruction of menus,
	// but shouldn't render them, and shouldn't rerender itself
	var me = this;
	Events.on('relationsBuilt', function(){
		me.createDefaultMenus();
	});
	Events.on('foreignKeysReplaced', function(colls){
		console.log("topics with keys", colls.get('topics'));
	});
	this.chart = null;
	this.menus = [];
	this.render();
},

createDefaultMenus:function(){
	console.log("creating default menus");
	var items = Data.collections.keys();
	//var defaultChoiceKey = items[Math.floor(Math.random()*items.length)];
	var defaultChoiceKey = 'faculty';
	var choice = Data.collections.get(defaultChoiceKey);
	this.addMenu({
		choice: choice,
		menuItems: Data.collections.values(),
		choiceHandler: this.collectionSelected,
	}).chooseItem(defaultChoiceKey);
},

collectionSelected: function(coll){
	// make new list view
	if( this.chart ){
		this.chart.$el.remove();
	}
	var listView = new List(coll);
	$("#chart").append(listView.$el);
	this.chart = listView;
},

addMenu: function (options) {
	var rightMostMenu = this.menus[this.menus.length - 1];
	var newMenu = new MenuView(options, rightMostMenu);
	if( rightMostMenu !== undefined ) {
		rightMostMenu.right = newMenu;
	}
	this.menus.push(newMenu);
	this.$el.append(newMenu.$el);
	return newMenu;
},

removeMenu: function (slot) {
},


});

return QueryView;
});
