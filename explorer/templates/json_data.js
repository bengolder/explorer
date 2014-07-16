{% autoescape off %}
var JSON_DATA = {
	topics: {{ jsons.topics }},
	locations: {{ jsons.locations }},
	facultys: {{ jsons.faculty }},
	works: {{ jsons.works }},
	models: {{ jsons.models }},
	worktypes: {{ jsons.worktypes }}
};
{% endautoescape %}
