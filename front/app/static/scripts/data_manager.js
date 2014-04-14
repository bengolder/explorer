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

M.setCTypeLink = function(coll){
	coll.ctypes.forEach(function(key){
		M.model_defs.get(key).set('collection', coll);
	});
};

M.defineCollections = function(colls){

	var topics = colls.get('topics');
	topics.collectionName = 'topics';
	topics.ctypes = [20];
	M.setCTypeLink(topics);
	topics.addParentRelation('parent_topics', 'parents', 'children');

	var works = colls.get('works');
	works.collectionName = 'works';
	works.ctypes = [11, 12, 13, 14, 15, 16, 17, 18, 19];
	M.setCTypeLink(works);
	works.addRelation( 'authors', 'by', 'faculty', 'who worked on', 'works');
	works.addRelation( 'locations', 'related to', 'locations', 'related to', 'works');
	works.addRelation( 'topics', 'related to', 'topics', 'related to', 'works');
	// span: works with shared authors
	// span: works with shared topics
	// span: works with shared location

	var labs = new Works(works.where({'polymorphic_ctype': 13}));
	labs.collectionName = 'labs';
	labs.ctypes = [13];
	M.setCTypeLink(labs);
	labs.menuName = function(){return 'labs';};
	labs.addRelation( 'subprojects', 'responsible for', 'works', 'originating from', 'labs' );
	colls.set('labs', labs);

	var publications = new Works(works.filter(function(m){
		var typeKey = m.attributes.polymorphic_ctype;
		return typeKey > 15 && typeKey < 20;
	}));
	publications.collectionName = 'publications';
	publications.ctypes = [16, 17, 18, 19];
	M.setCTypeLink(publications);
	publications.menuName = function(){return 'publications';};
	colls.set('publications', publications);
	// span: publications from 

	var books = new Works(works.where({'polymorphic_ctype': 17}));
	books.collectionName = 'books';
	books.ctypes = [17];
	M.setCTypeLink(books);
	books.menuName = function(){return 'books';};
	console.log("books",books);
	colls.set('books', books);

	var faculty = colls.get('faculty');
	faculty.collectionName = 'faculty';
	faculty.ctypes = [10];
	M.setCTypeLink(faculty);
	faculty.addRelation( 'current_interests', 'interested in', 'topics', 'of interest to', 'faculty');
	faculty.addRelation( 'places_lived', 'from', 'locations');
	// span: faculty with shared works
	// span: faculty with shared interests
	// span: faculty whose works share topics
	// span: faculty whose works share locations
	// span: faculty whose publications share publishers

	var locations = colls.get('locations');
	locations.ctypes = [21];
	M.setCTypeLink(locations);
	locations.collectionName = 'locations';
	locations.addParentRelation( 'parent_locations', 'parents', 'children');
	// span: locations whose works share topics
	// span: locations whose works share authors

};

M.buildRelationGraph = function(colls){
	// these might be processor intensive, and it might therefore be worth it
	// to spin off web workers to help optimize this process.
	M.defineCollections(colls);
	colls.forEach(function (key, coll){
		coll.buildRelations(this);
	});
	console.log("ctypes", M.model_defs);
	Events.trigger('relationsBuilt', M.collections);
};

M.replaceForeignKeys = function(colls){
	colls.forEach(function(key, coll){
		coll.replaceForeignKeys(colls);
	});
	Events.trigger('foreignKeysReplaced', colls);
};

Events.on('allCollectionsFetched', function(colls){
	M.buildRelationGraph(colls);
});

Events.on('relationsBuilt', function(colls){
	M.replaceForeignKeys(colls);
});

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
