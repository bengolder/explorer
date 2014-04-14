define([
'backbone',
'appconfig',
'models/model_type'
], function (BB, config, ModelType) {
var ModelTypes = BB.Collection.extend({
	url: config.api_root + 'models/',
	model: ModelType,
});
return ModelTypes;
});
