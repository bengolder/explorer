var BaseModel = require('../models/base_model');

var WorkType = BaseModel.extend({

initialize: function(){
	BaseModel.prototype.initialize.apply(this, arguments);
},

});
module.exports = WorkType;
