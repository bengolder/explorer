define([
'd3',
'jquery',
'backbone',
'event_manager',
'viz_manager'
], 
function (d3, $, BB, Events, Viz) {
	// All Viz types should start with the #chart element
	// and they should use d3 to do most of their rendering.
	// Ideally, their parent view will initialize them with the proper data.
var List = BB.View.extend({
	className: 'list-column',

	initialize: function(data){
		// data is a collection
		// we may want to let the collection point 
		// to a list item template
		this.data = data;
		this.render();
		this.$el.find('.details').hide();
	},

	render: function(){
		// we will want this to conditionally render the appropriate list view
		// for each item
		var me = this;
		d3.select(this.el)
			.selectAll('div')
			.data(this.data.models).enter()
			.append(function(d){
				var view = Viz.makeListView(d);
				return view.el;
			}).on('click', function(d){
				$(this).find('.details').slideToggle({ duration: 200 });
				console.log("clicked on", d.attributes);
				Events.trigger('specificItemSelected', d);
			});
	},
});
return List;
});
