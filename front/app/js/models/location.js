var BaseModel = require('../models/base_model');

var Location = BaseModel.extend({

initialize: function(){
	BaseModel.prototype.initialize.apply(this, arguments);
},

parse: function(response, options){
	// convert official_id attribute to integer, not text
	response.official_id = parseInt(response.official_id, 10);
	return response;
},

// idAttribute:,
// defaults:{},
// initialize:function(attributes, options){},
// validate:function(attributes, options){},

});
module.exports = Location;
