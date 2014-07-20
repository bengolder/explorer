define([
'jquery',
'underscore',
'backbone',
'models/base_model'
], function ($, _, BB, BaseModel) {
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
return Work;
});
