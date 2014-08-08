var $ = window.$;
var BB = require('../../../node_modules/backbone/backbone.js');
var MenuView = require('../views/menu'); 
var ChordView = require('../views/chord');
var GlobeView = require('../views/globe');
var ColumnsView = require('../views/columns');
var Events = require('../event_manager'); 
var Data = require('../data_manager');

var QueryView = BB.View.extend({

	className: 'btn-group',

	initialize: function () {
		// this should initialize once
		// it should then handle the creation and destruction of menus,
		// but shouldn't render them, and shouldn't rerender itself
		var me = this;
		Events.on('foreignKeysReplaced', function(){
			me.createDefaultMenus();
		});
		Events.on('menuItemChosen', function(item, menu){
			me.handleMenuChoice(item, menu);
		});
		this.chart = null;
		this.menus = [];
		this.initViews();
		this.render();
		console.log("loading query");
		Data.initializeCollections();
	},

	randomChoice: function(arr){
		return arr[Math.floor(Math.random()*arr.length)];
	},

	handleMenuChoice: function(item, menu){
		if ( menu === this.menus[0]){
			console.log("a new collectoin was chosen", item.menuName);
			this.handleSelectedCollection(item);
		} else if ( menu === this.menus[1] ){
			console.log("a collection option was chosen", item);
		}
	},

	createDefaultMenus:function(){
		console.log("creating default menus");
		// choose one collection randomly
		var keys = ['topics', 'locations', 'facultys', 'works'];
		var randomChoiceKey  = this.randomChoice(keys);
		var randomChoice = Data.collections.get(randomChoiceKey);
		// get the default collections
		var choices = keys.map(function(key){ return Data.collections.get(key); });
		// add a menu with the item chosen, the possible itemsm and a handler for
		// the choice
		this.addMenu({
			choice: randomChoice,
			menuItems: choices,
		}).chooseItem('faculty');
	},

	handleSelectedCollection: function(coll){
		// remove any existing chart
		console.log("handling choice", coll);
		if( this.chart ){
			this.chart.$el.remove();
			console.log("removedChart");
		}
		if( coll.viewOptions ){
			// if this collection has multiple view options
			// then select one at random and add a menu of the different options
			var randomChoice = this.randomChoice(coll.viewOptions);
			this.addMenu({
				choice: randomChoice,
				menuItems: coll.viewOptions,
			}).chooseItem(randomChoice);
			// currently there is no handler for view options
		} else {
			if( coll.key == 'locations' ){
				console.log("rendering globe view with", coll.globeData());
				this.renderGlobeView(coll.globeData());
			} else if( coll.key == 'works' ){
				this.renderColumnsView(coll);
			} else {
				console.log("rendering chord view with", coll.graphData());
				this.renderChordView(coll.graphData());
			}
		}
	},


	addMenu: function (options) {
		// append a new menu
		// ensure that the menus are aware of each other
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

	initViews: function(){
		this.views = {
			'globe': new GlobeView(),
		};
	},

	renderGlobeView: function(data){
		var view = this.views.globe;
		this.chart = view;
		$("#chart").append(view.$el);
		console.log("appended", view);
		view.render(data);
	},

	renderChordView: function(data){
		var view = new ChordView(data);
		this.chart = view;
		$("#chart").append(view.$el);
		console.log("appended", view);
		view.chord();
	},

	renderColumnsView: function(data){
		var view = new ColumnsView(data);
		this.chart = view;
		$("#chart").append(view.$el);
		console.log("appended", view);
		view.render(data);
	},

});

module.exports = QueryView;
