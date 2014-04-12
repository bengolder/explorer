define([
  'underscore',
  'backbone',
], function(_, BB) {
var E = {};
_.extend(E, BB.Events);

/* SUBSCRIBEABLE EVENTS
 * collectionLoaded, <collectionName>
 * allCollectionsLoaded, <collectionsSet>
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
