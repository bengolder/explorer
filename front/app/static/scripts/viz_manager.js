define([
	'd3',
	'underscore',
	'backbone',
	'data_manager',
	'views/list_item_base',
	'hbs!templates/list/topic',
	'hbs!templates/list/faculty',
	'hbs!templates/list/work',
	'hbs!templates/list/location',
	'hbs!templates/list/lab',
	'hbs!templates/list/publication',
	'hbs!templates/list/book',
], function (
	d3, _, BB,
	Data, ListBase,
	topic_templ,
	faculty_templ,
	work_templ,
	location_templ,
	lab_templ,
	publication_templ,
	book_templ
) {
var V = {

makeListView: function(m, options){
	options = options || {};
	var key = m.get("polymorphic_ctype");
	var localColl = Data.ctypes.get(key).get('collection');
	var listTemplate = V.templatesTable[localColl.collectionName];
	var view = new ListBase(_.extend({
		model: m,
		collection: localColl,
		template: listTemplate,
	}, options));

	return view;
},

templatesTable: {
	"faculty": faculty_templ,
	"works": work_templ,
	"projects": work_templ,
	"researchlabs": lab_templ,
	"publication": publication_templ,
	"books": book_templ,
	"articles": publication_templ,
	"journalarticle": publication_templ,
	"topics": topic_templ,
	"locations": location_templ,
	"subject": null,
	"course": null,
	"colloquium": work_templ,
},

};


return V;
});
