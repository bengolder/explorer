define([], 
function () {
var config = {
	'static_root':'/static/',
};
// a hack to deal with passing local vs. production settings & CORS
if( API_ROOT.indexOf('http:') != -1 ) {
	config['api_root'] = API_ROOT;
} else {
	config['api_root'] = 'http://127.0.0.1:8000/api/';
}

function api(s){ return config.api_root + s;}

config.collections = [

	{ 'collectionName': 'topics',
	  'url': api('topic/'),
	  'display': 'name',
	  'menuName': 'topics',
	  'ctypeNames': ['topic'],
	  'parentRelation': ['topics', 'parent_topics', 'parents', 'children'],
	},

	{ 'collectionName': 'locations',
	  'url': api('location/'),
	  'display': 'name',
	  'menuName': 'locations',
	  'ctypeNames': ['location'],
	  'parentRelation': ['locations', 'parent_locations', 'parents', 'children'],
	  // span: locations whose works share topics
	  // span: locations whose works share authors
	},

	{ 'collectionName': 'faculty',
	  'url': api('faculty/'),
	  'display': 'full_name',
	  'menuName': 'faculty',
	  'ctypeNames': ["faculty"],
	  'relations':[
		  ['faculty', 'current_interests', 'interested in', 'topics', 'of interest to', 'faculty'],
		  ['faculty', 'places_lived', 'from', 'locations'],
		  ],
	  // span: topics of their works
	  // span: faculty with shared works
	  // span: faculty with shared interests
	  // span: faculty whose works share topics
	  // span: faculty whose works share locations
	  // span: faculty whose publications share publishers
	},

	{ 'collectionName': 'works',
	  'url': api('work/'),
	  'display': 'title',
	  'menuName': 'works',
	  'ctypeNames': [ "work", "project", "researchinitiative", "publicationformat",
		"publisher", "publication", "book", "article", "journalarticle" ],
	  'relations':[
		  ['works', 'authors', 'by', 'faculty', 'who worked on', 'works'],
		  ['works', 'locations', 'related to', 'locations', 'related to', 'works'],
		  ['works', 'topics', 'related to', 'topics', 'related to', 'works'],
		  ],
	  // span: works with shared authors
	  // span: works with shared topics
	  // span: works with shared location
	},

	{ 'collectionName': 'labs',
	  'display': 'title',
	  'menuName': 'labs',
	  'parentCollection':'works',
	  'ctypeNames': ['researchinitiative'],
	  'relations': [
		  ['labs', 'subprojects', 'responsible for', 'works', 'originating from', 'labs'],
		  ],
	},

	{ 'collectionName': 'publications',
	  'display': 'title',
	  'menuName': 'publications',
	  'parentCollection':'works',
	  'ctypeNames': ["publication", "book", "article", "journalarticle"],
	},

	{ 'collectionName': 'books',
	  'display': 'title',
	  'menuName': 'books',
	  'parentCollection':'works',
	  'ctypeNames': ["book"],
	},
];
config.api = api;

return config;
});
