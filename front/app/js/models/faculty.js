var BaseModel = require('../models/base_model');

var Faculty	= BaseModel.extend({

urlKey:'home_page',
displayKey:'full_name',

initialize: function(){
	BaseModel.prototype.initialize.apply(this, arguments);
},

displayText: function(){
	return this.get('full_name');
},


// idAttribute:,
// defaults:{},
// initialize:function(attributes, options){},
// validate:function(attributes, options){},

});
module.exports = Faculty;

