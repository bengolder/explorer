define([
'jquery',
'underscore',
'backbone',
'appconfig',
'collections/related',
'models/topic'
], function ($, _, BB, config, Related, Topic) {
var Topics = BB.Collection.extend(_.extend(Related, {
	url: config.api_root + 'topic/',
	model: Topic,
	menuName: function(){
		return 'topics';
	},
}));
return Topics;
});
