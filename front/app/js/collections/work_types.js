var Related = require('../collections/related');
var ModelType = require('../models/work_type');

var WorkTypes = Related.extend({
	key: 'worktypes',
	model: ModelType,
	initialize: function(){
		Related.prototype.initialize.apply(this, arguments);
	},
});

module.exports = WorkTypes;
