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
], function (
	d3, _, BB,
	Data, ListBase,
	topic_templ,
	faculty_templ,
	work_templ,
	location_templ
) {
var V = {

makeListView: function(m, options){
	options = options || {};
	var key = m.get("polymorphic_ctype");
	var ctype = Data.ctypes.get(key)
	var localColl = ctype.get('collection');
	var listTemplate = V.templatesTable[localColl.collectionName];
	var view = new ListBase(_.extend({
		model: m,
		collection: localColl,
		template: listTemplate,
		className: 'list-item ' + ctype.get('model')
	}, options));

	return view;
},

templatesTable: {
	"faculty": faculty_templ,
	"works": work_templ,
	"projects": work_templ,
	"labs": work_templ,
	"publications": work_templ,
	"books": work_templ,
	"articles": work_templ,
	"journalarticles": work_templ,
	"topics": topic_templ,
	"locations": location_templ,
	"subjects": null,
	"courses": null,
	"colloquia": work_templ,
},

};


return V;
});
