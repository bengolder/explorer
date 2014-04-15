define([
  'd3',
  'underscore',
  'backbone',
  'appconfig',
  'event_manager',
  'models/base_model',
  'collections/related',
], function( d3, _, BB,
	config, Events, 
	BaseModelOpts,
	Related ) {

var M = {};
M.collections = d3.map();

function fetchCollection( key, coll ) {
	console.log("fetching", key);
	coll.fetch({
		'success':function(){
			Events.trigger('collectionFetched', key);
		}
	});
}

M.fetchBaseCollections = function(){
		M.collectionQueue = d3.set(M.collections.keys());
		M.collections.forEach( fetchCollection );
};


function instaCollection( options ){
	var C = BB.Collection.extend(options);
	return C;
}

function relatedCollection(options){
	return instaCollection( _.extend(Related, options) );
}

M.loadDefinitions = function(){
	var CTypes = instaCollection({
		url: config.api('models/')
	});
	M.ctypes = new CTypes();
	M.ctypes.fetch({
		'success':function(){
			Events.trigger('ctypesLoaded');
		}
	});
};

M.setCTypeLink = function(coll){
	coll.ctypes.forEach(function(key){
		M.ctypes.get(key).set('collection', coll);
	});
};

M.defineModel = function(conf){
	var M = BB.Model.extend(
		_.extend(BaseModelOpts, {
			displayKey: conf.display,
	}));
	return M;
};

M.defineCollection = function(conf){
	// add ctypes keys attribute
	conf.ctypes = _.map(conf.ctypeNames, 
		function(ctypeName){
			var ctype = M.ctypes.findWhere({'model': ctypeName});
			return ctype.id;
	});
	conf.model = M.defineModel(conf);
	var Collection, coll;
	if( !_.has(conf, 'parentCollection') ){
		// make a new class
		Collection = relatedCollection(conf);
		coll = new Collection();
	} else {
		// filter an existing class to make a new collection
		// this assumes that the parent already exists and has been 
		// fetched
		var parentColl = M.collections.get( conf.parentCollection );
		Collection = parentColl.sourceClass;
		coll = new Collection( 
				parentColl.filter(
					function(m){
						return _.contains( conf.ctypes, 
								m.get('polymorphic_ctype')
						);
				})
		);
		// override parent settings with child
		_.extend(coll, conf);
	}
	coll.sourceClass = Collection;
	M.collections.set(conf.collectionName, coll);
	M.setCTypeLink(coll);
};


M.defineBaseCollections = function(){
	config.collections.forEach(function(collConfig){
		if( !_.has( collConfig, 'parentCollection' ) ){
			M.defineCollection(collConfig);
		}
	});
	Events.trigger('baseCollectionsDefined');
};
M.defineChildCollections = function(){
	config.collections.forEach(function(collConfig){
		if( _.has( collConfig, 'parentCollection' ) ){
			M.defineCollection(collConfig);
		}
	});
	Events.trigger('allCollectionsDefined');
};



M.buildRelationGraph = function(){
	// these might be processor intensive, and it might therefore be worth it
	// to spin off web workers to help optimize this process.
	M.collections.forEach(function (key, coll){
		coll.buildRelations(M.collections);
	});
	console.log("ctypes", M.ctypes);
	Events.trigger('relationsBuilt', M.collections);
};

M.replaceForeignKeys = function(colls){
	colls.forEach(function(key, coll){
		coll.replaceForeignKeys(colls);
	});
	Events.trigger('foreignKeysReplaced', colls);
};

Events.on('ctypesLoaded', function(){
	M.defineBaseCollections();
});

Events.on('baseCollectionsDefined', function(){
	M.fetchBaseCollections();
});

Events.on('baseCollectionsFetched', function(){
	M.defineChildCollections();
});
Events.on('allCollectionsDefined', function(){
	M.buildRelationGraph();
});


Events.on('relationsBuilt', function(colls){
	M.replaceForeignKeys(colls);
});

Events.on('collectionFetched', function(key){
	// model defs is not in the collectionQueue
	// so ignore it
	if( key == 'model_defs' ) {
		return;
	}
	M.collectionQueue.remove(key);
	if( M.collectionQueue.empty() ) {
		Events.trigger('baseCollectionsFetched', M.collections);
	}
});

M.loadDefinitions();

return M;

});
