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
	  'menuName': 'topics',
	  'ctypeNames': ['topic'],
	  'parentRelation': ['parent_topics', 'parents', 'children'],
	},

	{ 'collectionName': 'locations',
	  'url': api('location/'),
	  'menuName': 'locations',
	  'ctypeNames': ['location'],
	  'parentRelation': ['parent_locations', 'parents', 'children'],
	  // span: locations whose works share topics
	  // span: locations whose works share authors
	},

	{ 'collectionName': 'faculty',
	  'url': api('faculty/'),
	  'menuName': 'faculty',
	  'ctypeNames': ["faculty"],
	  'relations':[
		  ['current_interests', 'interested in', 'topics', 'of interest to', 'faculty'],
		  ['places_lived', 'from', 'locations'],
		  ],
	  // span: faculty with shared works
	  // span: faculty with shared interests
	  // span: faculty whose works share topics
	  // span: faculty whose works share locations
	  // span: faculty whose publications share publishers
	},

	{ 'collectionName': 'works',
	  'url': api('work/'),
	  'menuName': 'works',
	  'ctypeNames': [ "work", "project", "researchinitiative", "publicationformat",
		"publisher", "publication", "book", "article", "journalarticle" ],
	  'relations':[
		  ['authors', 'by', 'faculty', 'who worked on', 'works'],
		  ['locations', 'related to', 'locations', 'related to', 'works'],
		  ['topics', 'related to', 'topics', 'related to', 'works'],
		  ],
	  // span: works with shared authors
	  // span: works with shared topics
	  // span: works with shared location
	},

	{ 'collectionName': 'labs',
	  'menuName': 'labs',
	  'parentCollection':'works',
	  'ctypeNames': ['researchinitiative'],
	  'relations': [
		  ['subprojects', 'responsible for', 'works', 'originating from', 'labs'],
		  ],
	},

	{ 'collectionName': 'publications',
	  'menuName': 'publications',
	  'parentCollection':'works',
	  'ctypeNames': ["publication", "book", "article", "journalarticle"],
	},

	{ 'collectionName': 'books',
	  'menuName': 'books',
	  'parentCollection':'works',
	  'ctypeNames': ["book"],
	},
];
config.api = api;

return config;
});
