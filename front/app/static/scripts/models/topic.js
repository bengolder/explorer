define([
'jquery',
'underscore',
'backbone',
'models/base_model'
], function ($, _, BB, BaseModel) {
var Topic = BaseModel.extend({

initialize: function(){
	BaseModel.prototype.initialize.apply(this, arguments);
},

displayText: function(){
	return this.get('name');
},

// idAttribute:,
// defaults:{},
// initialize:function(attributes, options){},
// validate:function(attributes, options){},

});
return Topic;
});
