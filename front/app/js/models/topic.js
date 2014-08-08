var BaseModel = require('../models/base_model');

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
module.exports = Topic;
