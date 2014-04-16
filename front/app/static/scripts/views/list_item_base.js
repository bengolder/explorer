define([
'underscore',
'backbone',
], 
function (_, BB) {
var ListBase = BB.View.extend({

initialize: function (options) {
	this.template = options.template;
	this.render();
},

render: function () {
	if ( _.has(this, 'prepData') ){
		this.prepData();
	} else {
		this.data = this.model.serialize();
	}
	this.$el.append(
		this.template(this.data)
	);
},

});
return ListBase;
});
