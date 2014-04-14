define([
  'd3',
  'underscore',
  'event_manager',
  'collections/topics',
  'collections/works',
  'collections/facultys',
  'collections/locations',
  'collections/model_types',
], function(
	d3, 
	_,
	Events, 
	Topics, 
	Works, 
	Facultys, 
	Locations,
	ModelTypes
	) {

function loadCollection( key, coll ) {
	console.log("fetching", key);
	coll.fetch({
		'success':function(){
			Events.trigger('collectionFetched', key);
		}
	});
}

var C = d3.map();
C.set('topics', new Topics());
C.set('works', new Works());
C.set('faculty', new Facultys());
C.set('locations', new Locations());

var M = {};
M.collections = C;
M.model_defs = new ModelTypes();
loadCollection( 'model_defs', M.model_defs )

M.loadAll = function(){
		this.collectionQueue = d3.set(this.collections.keys());
		this.collections.forEach( loadCollection );
};

M.defineCollections = function(){

	var topics = M.collections.get('topics');
	topics.ctypes = [20];
	topics.addParentRelation('parent_topics', 'parents', 'children');

	var works = M.collections.get('works');
	works.ctypes = [11, 12, 13, 14, 15, 16, 17, 18, 19];
	works.addRelation( 'authors', 'by', 'faculty', 'who worked on', 'works');
	works.addRelation( 'locations', 'related to', 'locations', 'related to', 'works');
	works.addRelation( 'topics', 'related to', 'topics', 'related to', 'works');

	var labs = new Works(works.where({'polymorphic_ctype': 13}));
	labs.ctypes = [13];
	labs.menuName = function(){return 'labs';};
	labs.addRelation( 'subprojects', 'responsible for', 'works', 'originating from', 'labs' );
	M.collections.set('labs', labs);

	var publications = new Works(works.filter(function(m){
		var typeKey = m.attributes.polymorphic_ctype;
		return typeKey > 15 && typeKey < 20;
	}));
	publications.ctypes = [16, 17, 18, 19];
	publications.menuName = function(){return 'publications';};
	M.collections.set('publications', publications);

	var books = new Works(works.where({'polymorphic_ctype': 17}));
	books.ctypes = [17];
	books.menuName = function(){return 'books';};
	console.log("books",books);
	M.collections.set('books', books);

	var faculty = M.collections.get('faculty');
	faculty.addRelation( 'current_interests', 'interested in', 'topics', 'of interest to', 'faculty');
	faculty.addRelation( 'places_lived', 'from', 'locations');

	var locations = M.collections.get('locations');
	locations.addParentRelation( 'parent_locations', 'parents', 'children');
};

M.buildRelationGraph = function(colls){
	M.defineCollections();
	console.log("ready to build relation graph with", M.model_defs);
	Events.trigger('relationsBuilt', M.collections);
};

Events.on('allCollectionsFetched', function(colls){
	M.buildRelationGraph(colls);
})

Events.on('collectionFetched', function(key){
	if( key == 'model_defs' ) {
		return;
	}
	M.collectionQueue.remove(key);
	if( M.collectionQueue.empty() ) {
		Events.trigger('allCollectionsFetched', M.collections);
	}
});

return M;

});
