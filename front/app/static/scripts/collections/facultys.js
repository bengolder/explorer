define([
'jquery',
'underscore',
'backbone',
'appconfig',
'collections/related',
'models/faculty',
], function ($, _, BB, config, Related, Faculty) {
var Facultys = BB.Collection.extend(_.extend( Related, {
	url: config.api_root + 'faculty/',
	model: Faculty,
	menuName: function(){
		return 'faculty';
	},
}));

return Facultys;
});
