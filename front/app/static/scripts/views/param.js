define([
'jquery',
'backbone',
'hbs!templates/query_parameter'
], function($, BB, template) {

var ParamView = BB.View.extend({

className: 'btn-group',

initialize: function () {
	this.render();
	this.initSubViews();
},

initSubViews: function () {

},


render: function () {
	var content = template({
		'param_type': 'LIST',
	});
	this.$el.html(content);
},

});

return ParamView;
});

