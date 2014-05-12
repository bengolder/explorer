define([
  'd3',
  'underscore',
  'backbone',
  'appconfig',
  'event_manager',
  'collections/work_types',
  'collections/works',
  'collections/facultys',
  'collections/topics',
  'collections/locations'
], function( d3, _, BB,
	config, Events, 
	WorkTypes,
	Works,
	Facultys,
	Topics,
	Locations
) {

var M = {};

// These are all the collection types
// each will be fetched, stored under it's key
// and then relations will be built
M.bases = [
	WorkTypes, Works, Facultys, Topics, Locations
];

// This will store the instantiated collection objects
// each object is stored under a key
// keys are: worktypes, works, facultys, topics, locations
M.collections = d3.map();

M.initializeCollections = function initializeCollections() {
	// create each collection and store it under its key
	M.bases.forEach(function (Coll, i) {
		var coll = new Coll();
		M.collections.set( coll.key, coll );
	});
	// after all the collections are initialized, fetch their data
	M.fetchCollections();
};

function fetchCollection( key, coll ) {
	console.log("fetching", key);
	coll.fetch({
		'success':function(){
			Events.trigger('collectionFetched', key);
		}
	});
}

M.fetchCollections = function(){
		M.collectionQueue = d3.set(M.collections.keys());
		M.collections.forEach( fetchCollection );
};

M.buildRelationGraph = function(){
	// these might be processor intensive, and it might therefore be worth it
	// to spin off web workers to help optimize this process.
	M.collections.forEach(function (key, coll){
		coll.buildRelations(M.collections);
	});
	Events.trigger('relationsBuilt', M.collections);
};

M.replaceForeignKeys = function(colls){
	colls.forEach(function(key, coll){
		coll.replaceForeignKeys(colls);
	});
	Events.trigger('foreignKeysReplaced', colls);
};

Events.on('relationsBuilt', function(colls){
	M.replaceForeignKeys(colls);
});

Events.on('collectionsFetched', function(){
	M.buildRelationGraph();
});

Events.on('collectionFetched', function(key){
	// model defs is not in the collectionQueue
	// so ignore it
	M.collectionQueue.remove(key);
	if( M.collectionQueue.empty() ) {
		Events.trigger('collectionsFetched', M.collections);
	}
});

M.initializeCollections();

return M;

});
