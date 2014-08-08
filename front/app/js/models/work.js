var BaseModel = require('../models/base_model');

var Work = BaseModel.extend({

displayKey: 'title',
urlKey: 'website',

initialize: function(){
	BaseModel.prototype.initialize.apply(this, arguments);
},
// idAttribute:,
// defaults:{},
// initialize:function(attributes, options){},
// validate:function(attributes, options){},

});

module.exports = Work;
