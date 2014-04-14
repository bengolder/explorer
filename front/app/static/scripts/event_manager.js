define([
  'underscore',
  'backbone',
], function(_, BB) {
var E = {};
_.extend(E, BB.Events);

/* SUBSCRIBEABLE EVENTS
 * collectionFetched, <collectionName>
 * allCollectionsFetched, <collectionsSet>
 * relationsBuilt, <collectionsSet>
 * specificItemSelected, <item>
 *
 * PLANNED EVENTS (unimplemented)
 * relationGraphBuilt
 */

// log all events
E.on("all", function(eventName){
	console.log("event triggered:",eventName, arguments);
});

return E;
});
