define([
], function () {
var FacultyBase = {
// Available from inheritance:
	// collection
	// displayKey

// topics with similar works
spans: {
'collaborators': {
	'bridge_attribute': 'works',
	'other_attribute': 'authors',
	},
'same_interests':{
	'bridge_attribute': 'current_interests',
	'other_attribute': 'faculty',
},

'related_locations':{
	'bridge_attribute': 'works',
	'other_attribute': 'locations',
},

'work_interests':{
	'bridge_attribute': 'works',
	'other_attribute': 'topics',
}

},

};
return FacultyBase;
});


