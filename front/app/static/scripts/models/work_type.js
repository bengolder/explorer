define([
'backbone',
'models/base_model'
], function (BB, BaseModel) {
var WorkType = BaseModel.extend({

initialize: function(){
	BaseModel.prototype.initialize.apply(this, arguments);
},

});
return WorkType;
});
