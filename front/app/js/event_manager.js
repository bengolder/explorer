var _ = require('underscore');
var BB = require('backbone');


var Events = {};
_.extend(Events, BB.Events);

// While I have been thinking that using events makes for some nice
// asynchronous programming, it doesn't.
// Javascript is single-threaded, so while function order may be non-linear,
// each task is carried out one after another.
// In other words, tying a lot of listeners to an event will result in a
// certain cost, as each of those functions is executed before moving on.
// The two asynchronous tasks I can utilize to create additional threads are 
// AJAX requests and web workers.
// Maintain a centralized system of events can help create a loosely coupled
// system that can be more easily converted to asynchronous tasks.

/* SUBSCRIBEABLE EVENTS
 * collectionFetched, <collectionName>
 * collectionsFetched, <collectionsSet>
 * relationsBuilt, <collectionsSet>
 * foreignKeysReplaced, <collectionsSet>
 * menuItemChosen, <chosenItem>, <menu>
 * specificItemSelected, <item>
 * worldGeometryLoaded, <json_data>
 * globeViewReady
 */

// log all events
Events.on("all", function(eventName){
	console.log("event triggered:", eventName, arguments);
});

module.exports = Events;
