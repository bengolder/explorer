define([
'backbone',
'appconfig',
'collections/related',
'models/work_type'
], function (BB, config, Related, ModelType) {
var WorkTypes = Related.extend({
	key: 'worktypes',
	model: ModelType,
	initialize: function(){
		Related.prototype.initialize.apply(this, arguments);
	},
});
return WorkTypes;
});
