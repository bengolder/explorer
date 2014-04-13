define([
  'd3',
  'event_manager',
  'collections/topics',
  'collections/works',
  'collections/facultys',
  'collections/locations',
], function(d3, Events, Topics, Works, Facultys, Locations) {

function loadCollection( key, coll ) {
	console.log("fetching", key);
	coll.fetch({
		'success':function(){
			Events.trigger('collectionFetched', key);
		}
	});
}

var C = d3.map();
C.set('topics',  new Topics()   );
C.set('works',   new Works()    );
C.set('faculty', new Facultys() );
C.set('location', new Locations() );

var M = {};
M.collections = C;
M.loadAll = function(){
		this.collectionQueue = d3.set(this.collections.keys());
		this.collections.forEach( loadCollection );
};

M.buildRelationGraph = function(colls){
	console.log("ready to build relation graph with", colls);
};

Events.on('allCollectionsFetched', function(colls){
	M.buildRelationGraph(colls);
})

Events.on('collectionFetched', function(key){
	M.collectionQueue.remove(key);
	if( M.collectionQueue.empty() ) {
		Events.trigger('allCollectionsFetched', M.collections);
	}

});

return M;

});
