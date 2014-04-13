define([
'jquery', 'backbone',
'views/menu',
'viz_manager',
'event_manager',
'data_manager',
], function($, BB, 
	MenuView, 
	VisualizationManager, 
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
	Events.on('allCollectionsFetched', function(){
		me.createDefaultMenus();
	});
	Data.loadAll();
	this.menus = [];
	this.render();
},

createDefaultMenus:function(){
	console.log("creating default menus");
	var vizOptions = VisualizationManager.visualizations;
	this.addMenu({
		choice: vizOptions[0],
		menuItems: vizOptions,
	});
	this.addMenu({
		choice: Data.collections.get('topics'),
		menuItems: Data.collections.values(),
	});
},

addMenu: function (options) {
	var rightMostMenu = this.menus[this.menus.length - 1];
	var newMenu = new MenuView(options, rightMostMenu);
	if( rightMostMenu !== undefined ) {
		rightMostMenu.right = newMenu;
	}
	this.menus.push(newMenu);
	this.$el.append(newMenu.$el);
},

removeMenu: function (slot) {
},


});

return QueryView;
});
