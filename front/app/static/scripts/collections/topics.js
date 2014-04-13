define([
'jquery',
'underscore',
'backbone',
'appconfig',
'models/topic'
], function ($, _, BB, config, Topic) {
var Topics = BB.Collection.extend({
	//comparator:,
	//parse:, // parse the reponse
	url: config.api_root + 'topic/',
	model: Topic,
	menuName: function(){
		return 'topics';
	},
});
return Topics;
});
